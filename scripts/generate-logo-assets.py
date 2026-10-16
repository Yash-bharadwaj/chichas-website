#!/usr/bin/env python3
"""
CHICHA'S — brand asset generator.

Takes the single supplied master logo (chichasLogo.jpeg, 935x930) and produces
every size the site needs for mobile and desktop, plus favicons, PWA icons and
an Open Graph social-preview image.

The master file has two small defects that are cleaned here, not by hand:
  1. a 1px pure-white strip across row 0 (screenshot edge),
  2. a stray thin circle outline near the top-left corner (capture artifact).

The logo artwork itself is never redrawn, recoloured or distorted. Only the
small icon sizes (favicon / header mark) use a centred crop of the emblem,
because the full badge is unreadable below ~48px. Every on-page display of the
brand uses the complete, uncropped logo.

Usage:  python3 scripts/generate-logo-assets.py
        npm run assets
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFilter
except ImportError:  # pragma: no cover
    sys.exit("Pillow is required:  python3 -m pip install Pillow")

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "chichasLogo.jpeg"
OUT = ROOT / "public" / "images"

# Brand tokens (sampled from the master logo background).
SAFFRON = (245, 166, 35)
DEEP_TURMERIC = (232, 135, 18)

# Region of the stray circle artifact in master-image coordinates.
ARTIFACT_BOX = (0, 24, 48, 78)

# Emblem crop (Charminar + the duo) used only for small icon sizes.
EMBLEM_BOX = (238, 184, 702, 608)

# Widths the <img srcset> offers. 1x/2x/3x for a logo that renders at
# roughly 136-200 CSS px on phones and up to 240 CSS px on desktop.
LOGO_WIDTHS = (240, 320, 480, 640, 928)

JPEG_OPTS = dict(quality=84, optimize=True, progressive=True, subsampling=1)
WEBP_OPTS = dict(quality=82, method=6)


def load_master() -> Image.Image:
    if not SOURCE.exists():
        sys.exit(f"Master logo not found at {SOURCE}")
    return Image.open(SOURCE).convert("RGB")


def heal_artifact(im: Image.Image, box: tuple[int, int, int, int]) -> Image.Image:
    """Erase the stray circle without leaving a visible patch seam.

    The corner it sits in is a smooth saffron gradient, so the repair is done in
    two passes: a vertical interpolation rebuilds the gradient underneath, then a
    heavily blurred copy is composited back through a feathered mask so no patch
    edge survives.
    """
    im = im.copy()
    rough = im.copy()
    px = rough.load()
    x0, y0, x1, y1 = box
    top_row = [im.getpixel((x, y0 - 1)) for x in range(x0, x1)]
    bottom_row = [im.getpixel((x, y1 + 1)) for x in range(x0, x1)]
    span = y1 - y0 + 1
    for i, x in enumerate(range(x0, x1)):
        top, bottom = top_row[i], bottom_row[i]
        for j, y in enumerate(range(y0, y1 + 1)):
            t = (j + 1) / (span + 1)
            px[x, y] = tuple(round(top[c] + (bottom[c] - top[c]) * t) for c in range(3))

    smooth = rough.filter(ImageFilter.GaussianBlur(24))
    # Solid inside the artifact, feathered outside it, so the circle is fully
    # replaced while the transition back into the artwork stays invisible.
    mask = Image.new("L", im.size, 0)
    halo = ImageDraw.Draw(mask)
    halo.rectangle((x0 - 14, y0 - 14, x1 + 14, y1 + 14), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(10))
    ImageDraw.Draw(mask).rectangle((x0 - 2, y0 - 2, x1 + 2, y1 + 2), fill=255)
    return Image.composite(smooth, im, mask)


def clean_master(im: Image.Image) -> Image.Image:
    """Trim the capture border and heal the artifact."""
    im = heal_artifact(im, ARTIFACT_BOX)
    w, h = im.size
    return im.crop((1, 1, w - 1, h - 1))  # drops the white row 0 + 1px noise edges


def square(im: Image.Image, size: int, bg: tuple[int, int, int] = SAFFRON) -> Image.Image:
    """Fit the artwork into a square canvas without distorting its proportions."""
    out = Image.new("RGB", (size, size), bg)
    art = im.copy()
    art.thumbnail((size, size), Image.LANCZOS)
    out.paste(art, ((size - art.width) // 2, (size - art.height) // 2))
    return out


def rounded_png(im: Image.Image, size: int, radius_ratio: float = 0.22) -> Image.Image:
    """Square icon with soft corners and real transparency (header mark)."""
    base = square(im, size).convert("RGBA")
    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size * 4 - 1, size * 4 - 1), radius=int(size * 4 * radius_ratio), fill=255
    )
    base.putalpha(mask.resize((size, size), Image.LANCZOS))
    return base


def write(im: Image.Image, name: str) -> None:
    path = OUT / name
    if path.suffix == ".webp":
        im.save(path, "WEBP", **WEBP_OPTS)
    elif path.suffix == ".jpg":
        im.convert("RGB").save(path, "JPEG", **JPEG_OPTS)
    else:
        im.save(path)
    print(f"  {path.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}  {path.stat().st_size / 1024:.1f} KB")


def og_image(logo: Image.Image) -> Image.Image:
    """1200x630 social card: the logo on a warm saffron field."""
    w, h = 1200, 630
    card = Image.new("RGB", (w, h), SAFFRON)
    grad = Image.new("RGB", (1, h))
    gp = grad.load()
    for y in range(h):
        t = y / (h - 1)
        gp[0, y] = tuple(
            round(SAFFRON[c] + (DEEP_TURMERIC[c] - SAFFRON[c]) * t) for c in range(3)
        )
    card = grad.resize((w, h), Image.BILINEAR)
    art = logo.copy()
    art.thumbnail((h - 48, h - 48), Image.LANCZOS)
    card.paste(art, ((w - art.width) // 2, (h - art.height) // 2))
    return card


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    master = clean_master(load_master())
    emblem = master.crop(EMBLEM_BOX)

    print("Full logo (hero, footer, social preview) — never cropped:")
    for width in LOGO_WIDTHS:
        height = round(master.height * width / master.width)
        resized = master.resize((width, height), Image.LANCZOS)
        write(resized, f"chichas-logo-{width}.webp")
        write(resized, f"chichas-logo-{width}.jpg")
    write(master, "chichas-logo.jpg")  # canonical full-resolution fallback

    print("Header mark + app icons (emblem crop for small sizes):")
    write(rounded_png(emblem, 96), "chichas-mark-96.png")
    write(rounded_png(emblem, 192), "chichas-mark-192.png")
    write(square(master, 180), "apple-touch-icon.png")
    write(square(master, 192), "icon-192.png")
    write(square(master, 512), "icon-512.png")
    write(square(emblem, 512), "maskable-512.png")  # safe-area friendly
    write(square(emblem, 32), "favicon-32.png")
    write(square(emblem, 16), "favicon-16.png")

    ico = ROOT / "public" / "favicon.ico"
    square(emblem, 64).save(ico, sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print(f"  {ico.relative_to(ROOT)}  multi-size  {ico.stat().st_size / 1024:.1f} KB")

    print("Social preview:")
    write(og_image(master), "og-image.jpg")

    print("\nDone. Rerun with `npm run assets` after replacing chichasLogo.jpeg.")


if __name__ == "__main__":
    main()
