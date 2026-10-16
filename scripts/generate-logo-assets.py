#!/usr/bin/env python3
"""
CHICHA'S — brand asset generator.

Takes the master logo (realLogo.PNG, 4500x4500) and produces every size the site
needs for mobile and desktop, plus favicons, PWA icons and an Open Graph image.

The artwork is never redrawn, recoloured or distorted — it is only ever scaled
proportionally and padded with its own background colour. Two framings are cut
from the master, both of which are just the logo at different zoom levels:

  LOCKUP  the whole mark (arch, duo, wordmark, tagline) trimmed to its content
          with even padding. This is what the page displays.
  EMBLEM  the arch and the duo on their own, for icon sizes at or below ~192px
          where the wordmark and tagline turn to mush.

Because the master's background is one flat saffron, padding a crop back out to
a square is seamless — the added area is the same colour as the artwork's own
background.

Usage:  python3 scripts/generate-logo-assets.py
        npm run assets
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:  # pragma: no cover
    sys.exit("Pillow is required:  python3 -m pip install Pillow")

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "realLogo.PNG"
OUT = ROOT / "public" / "images"

# How far a pixel must differ from the background colour to count as artwork.
CONTENT_TOLERANCE = 26
# Padding added around the trimmed lockup, as a fraction of its longest side.
LOCKUP_PADDING = 0.045

# The arch and the duo, in master-image coordinates. Measured so the crop stops
# just above the wordmark's white sticker outline.
EMBLEM_BOX = (1346, 646, 3082, 2140)

# Widths the <img srcset> offers: 1x/2x/3x for a logo rendering at roughly
# 176-208 CSS px on phones and up to 224 CSS px on desktop.
LOGO_WIDTHS = (240, 320, 480, 640, 900)

WEBP_OPTS = dict(quality=88, method=6)
PNG_OPTS = dict(optimize=True)
JPEG_OPTS = dict(quality=90, optimize=True, progressive=True, subsampling=0)


def load_master() -> Image.Image:
    if not SOURCE.exists():
        sys.exit(f"Master logo not found at {SOURCE}")
    return Image.open(SOURCE).convert("RGB")


def background_colour(im: Image.Image) -> tuple[int, int, int]:
    """The flat colour the logo sits on, sampled from the corners."""
    w, h = im.size
    corners = [im.getpixel(p) for p in ((4, 4), (w - 5, 4), (4, h - 5), (w - 5, h - 5))]
    if len(set(corners)) != 1:
        print(f"  note: corners differ ({corners}); using the top-left one")
    return corners[0]


def content_box(im: Image.Image, bg: tuple[int, int, int]) -> tuple[int, int, int, int]:
    """Bounding box of everything that is not the flat background."""
    w, h = im.size
    px = im.load()
    min_x, min_y, max_x, max_y = w, h, 0, 0
    for y in range(0, h, 3):
        for x in range(0, w, 3):
            pixel = px[x, y]
            if max(abs(pixel[i] - bg[i]) for i in range(3)) > CONTENT_TOLERANCE:
                min_x, max_x = min(min_x, x), max(max_x, x)
                min_y, max_y = min(min_y, y), max(max_y, y)
    if min_x > max_x:
        sys.exit("Could not find any artwork against the background colour")
    return (min_x, min_y, max_x, max_y)


def trimmed_lockup(im: Image.Image, bg: tuple[int, int, int]) -> Image.Image:
    """The whole mark, trimmed of its uneven margin and re-padded evenly."""
    x0, y0, x1, y1 = content_box(im, bg)
    pad = round(max(x1 - x0, y1 - y0) * LOCKUP_PADDING)
    box = (x0 - pad, y0 - pad, x1 + pad, y1 + pad)
    print(f"  content {x1 - x0}x{y1 - y0} at ({x0}, {y0}); padding {pad}px")

    # Crop inside the image, then pad back out with the logo's own background so
    # the result keeps even margins even where the master ran out of room.
    safe = (max(box[0], 0), max(box[1], 0), min(box[2], im.width), min(box[3], im.height))
    cropped = im.crop(safe)
    canvas = Image.new("RGB", (box[2] - box[0], box[3] - box[1]), bg)
    canvas.paste(cropped, (safe[0] - box[0], safe[1] - box[1]))
    return canvas


def square(im: Image.Image, size: int, bg: tuple[int, int, int], fill: float = 1.0) -> Image.Image:
    """Fit the artwork into a square canvas without distorting its proportions."""
    out = Image.new("RGB", (size, size), bg)
    art = im.copy()
    art.thumbnail((round(size * fill), round(size * fill)), Image.LANCZOS)
    out.paste(art, ((size - art.width) // 2, (size - art.height) // 2))
    return out


def rounded_png(im: Image.Image, size: int, bg: tuple[int, int, int], radius_ratio: float = 0.22) -> Image.Image:
    """Square icon with soft corners and real transparency (header mark)."""
    base = square(im, size, bg).convert("RGBA")
    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size * 4 - 1, size * 4 - 1), radius=int(size * 4 * radius_ratio), fill=255
    )
    base.putalpha(mask.resize((size, size), Image.LANCZOS))
    return base


def write(im: Image.Image, name: str, quantize: bool = False) -> None:
    """Save one asset. `quantize` palettes a PNG, which roughly halves the size
    of this flat, hard-edged artwork with no visible loss."""
    path = OUT / name
    if quantize:
        im = im.convert("RGB").quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    if path.suffix == ".webp":
        im.save(path, "WEBP", **WEBP_OPTS)
    elif path.suffix == ".jpg":
        im.convert("RGB").save(path, "JPEG", **JPEG_OPTS)
    else:
        im.save(path, **PNG_OPTS)
    print(f"  {path.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}  {path.stat().st_size / 1024:.1f} KB")


def og_image(lockup: Image.Image, bg: tuple[int, int, int]) -> Image.Image:
    """1200x630 social card: the lockup centred on its own saffron."""
    card = Image.new("RGB", (1200, 630), bg)
    art = lockup.copy()
    art.thumbnail((1000, 500), Image.LANCZOS)
    card.paste(art, ((1200 - art.width) // 2, (630 - art.height) // 2))
    return card


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    master = load_master()
    bg = background_colour(master)
    print(f"Master {master.width}x{master.height}, background rgb{bg}")

    lockup = trimmed_lockup(master, bg)
    emblem = master.crop(EMBLEM_BOX)

    print("\nFull lockup — what the page displays:")
    for width in LOGO_WIDTHS:
        height = round(lockup.height * width / lockup.width)
        resized = lockup.resize((width, height), Image.LANCZOS)
        write(resized, f"chichas-logo-{width}.webp")
        write(resized, f"chichas-logo-{width}.png", quantize=True)

    print("\nIcons — the emblem, which stays readable when small:")
    write(rounded_png(emblem, 96, bg), "chichas-mark-96.png")
    write(rounded_png(emblem, 192, bg), "chichas-mark-192.png")
    write(square(emblem, 180, bg), "apple-touch-icon.png")
    write(square(emblem, 192, bg), "icon-192.png")
    write(square(emblem, 512, bg), "icon-512.png")
    # Maskable icons get cropped to a circle by some launchers, so keep the
    # artwork inside the 80% safe area.
    write(square(emblem, 512, bg, fill=0.78), "maskable-512.png")
    write(square(emblem, 32, bg), "favicon-32.png")
    write(square(emblem, 16, bg), "favicon-16.png")

    ico = ROOT / "public" / "favicon.ico"
    square(emblem, 64, bg).save(ico, sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print(f"  {ico.relative_to(ROOT)}  multi-size  {ico.stat().st_size / 1024:.1f} KB")

    print("\nSocial preview:")
    write(og_image(lockup, bg), "og-image.jpg")

    ratio = lockup.width / lockup.height
    print(
        f"\nDone. Lockup aspect ratio {ratio:.3f} "
        f"(set src/data/site.ts logo width/height to match).\n"
        "Rerun with `npm run assets` after replacing realLogo.PNG."
    )


if __name__ == "__main__":
    main()
