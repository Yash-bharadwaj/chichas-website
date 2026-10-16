# Build a Premium Link-in-Bio Website for CHICHA’S

## 1. Your Role

Act as a world-class UI/UX designer, brand identity designer, and senior frontend engineer. Build a visually stunning, production-ready, mobile-first link-in-bio website for **CHICHA’S — Indian Street Food and Boba**, a restaurant located in St. Augustine, Florida.

The result should feel like a custom-designed mini restaurant website, combining the simplicity of Linktree with the visual quality of a premium restaurant landing page.

Do not create a generic template. Every color, icon, interaction, background detail, animation, and layout decision must feel intentionally designed for this specific brand.

**Primary objective:** Turn visitors from Instagram, WhatsApp, and other social platforms into restaurant customers by making it easy to explore the menu, join the WhatsApp community, follow Instagram, find the restaurant, and check opening hours.

---

## 2. Brand Assets and Links

Use the uploaded CHICHA’S logo as the primary brand asset.

**Logo requirements:**
- Use the supplied logo image exactly as provided.
- Do not recreate, distort, crop, or alter the logo.
- Preserve its original aspect ratio and recognizable colors.
- Display it prominently in the hero section, with a carefully chosen circular or softly rounded presentation if it suits the layout.
- Optimize its displayed size for mobile screens.
- The logo's warm orange background should inspire the website's visual identity.

### Official links

**Instagram**
https://www.instagram.com/chichas.fl/

**WhatsApp Community**
https://chat.whatsapp.com/GUPksNPgd3fICNjarYZVfN?s=cl&p=i&mlu=4&ilr=4&iam=2

**Restaurant Menu — Google Drive**
https://drive.google.com/drive/folders/1nO5NFns21ETmmgnzRcGBtZPvSfDynMPm?usp=sharing

**Google Maps / Directions**
https://www.google.com/maps/search/?api=1&query=304+Ashourian+Ave+Unit+3-108%2C+St.+Augustine%2C+FL+32092

**Restaurant address**
304 Ashourian Ave, Unit 3-108, St. Augustine, FL 32092, USA.

### Opening hours

Monday–Thursday: 11:00 AM–9:30 PM

Friday–Sunday: 10:00 AM–10:00 PM

Display the opening hours clearly in the website. Include the timezone appropriate for St. Augustine, Florida (America/New_York).

Do not invent a phone number, ordering URL, delivery service, customer reviews, ratings, or additional social accounts.

---

## 3. Design Direction: “Modern Indian Street Food Meets Premium Digital Branding”

Create a distinctive design inspired by Indian street-food culture, the warmth of spices, traditional Indian illustration, and modern hospitality branding.

The website should feel:
- Vibrant but sophisticated.
- Playful but not childish.
- Indian-inspired but contemporary.
- Rich in visual detail but never cluttered.
- Premium, polished, and memorable.
- Fast, intuitive, and exceptionally easy to use on mobile.

### Color palette

Use the following as the initial design tokens:

- **Saffron Orange:** `#F5A623`
- **Deep Turmeric:** `#E88712`
- **Warm Golden Yellow:** `#FFC857`
- **Creamy Ivory:** `#FFF6E6`
- **Soft Sand:** `#F2E3C7`
- **Deep Charcoal:** `#201713`
- **Spiced Brown:** `#65402A`
- **White:** `#FFFFFF`

Use the actual logo as the final reference for color balance.

Avoid using every color everywhere. Build a deliberate hierarchy with a dominant background, contrasting typography, subtle borders, and one clear accent color for primary actions.

### Background concept

Create a custom-looking background rather than a plain gradient.

Use a warm, pale saffron-to-cream background with very subtle decorative details inspired by the supplied logo:

- Fine hand-drawn line illustrations of chilies, spices, herbs, traditional serving pots, and cooking utensils.
- Tiny ornamental dots and delicate botanical flourishes.
- A few subtle circular or arch-shaped motifs inspired by Indian architectural forms.
- Very light paper-grain texture, if achievable without a large image or expensive rendering.
- Decorative elements positioned primarily near the outer edges, leaving the center clean and readable.

Decorative artwork should be extremely low contrast. The content must remain the focal point.

Do not place illustrations behind text where they affect readability. Do not make the background resemble a busy restaurant menu or an old-fashioned poster.

If you need additional illustrations, create simple, original SVG line art using thin strokes. Do not use emojis as illustrations.

### Typography

Choose a strong, modern pairing:

- Headings: `Outfit` or `Plus Jakarta Sans`.
- Body: `Inter` or `DM Sans`.

Use bold, expressive headings, clean body text, generous line height, and carefully controlled letter spacing.

The CHICHA’S brand name should be visually dominant, but not repeated excessively if the logo already communicates it clearly.

---

## 4. Light and Dark Themes

Implement a fully functional light/dark theme switch.

### Light theme
- Background: warm ivory and pale saffron.
- Cards: white or soft cream.
- Text: deep charcoal.
- Accents: orange and turmeric gold.
- Decorative artwork: muted brown/orange line art.

### Dark theme
- Background: deep charcoal or espresso brown.
- Cards: slightly lighter chocolate or charcoal surfaces.
- Text: warm ivory.
- Accents: golden yellow and saffron orange.
- Decorative artwork: subdued bronze or muted amber.

Requirements:
- Use a recognizable sun/moon icon button, not an emoji.
- Place the toggle in the top-right area.
- Support the device's preferred color scheme on first visit.
- Persist the visitor's selection using localStorage.
- Prevent a flash of the wrong theme during initial rendering where possible.
- Ensure sufficient contrast in both themes.
- Keep the logo legible and visually balanced in both themes.
- Transition colors smoothly without excessive animation.

The dark theme should look intentionally art-directed, not like the light theme with a black background.

---

## 5. Page Structure and Layout

Design a single-page experience with a centered content column and carefully controlled maximum width.

### A. Top navigation

Create a minimal top bar containing:
- A small CHICHA’S brand mark or logo.
- A theme toggle.
- Optional subtle decorative divider.

Keep the header compact, especially on mobile.

Do not create a large traditional navigation menu. This is a link-in-bio experience designed for visitors arriving from social media.

### B. Hero section

Create an impressive first impression.

Include:
- The supplied CHICHA’S logo.
- A small uppercase brand descriptor: `INDIAN STREET FOOD & BOBA`.
- A short headline, such as: **“Big Flavours. Good Vibes.”**
- A brief supporting sentence: “Your spot for Indian street-food cravings and refreshing boba in St. Augustine.”
- A small location label: `St. Augustine, Florida`.

Use a tasteful entrance animation with subtle movement and opacity.

The hero should feel like a premium brand introduction, not an ordinary business directory.

Do not overload it with unnecessary text.

### C. Primary action: Explore the menu

This must be the most prominent interactive element on the page.

Create a large, visually distinctive menu card or button featuring:
- A professional `Utensils` or `BookOpen` icon.
- Title: **Explore Our Menu**
- Subtitle: “Find your next favourite.”
- A right-arrow icon.
- A strong saffron/orange accent, tasteful gradient, or warm contrasting surface.

On click, open the supplied Google Drive menu link in a new tab.

If feasible, inspect the Google Drive folder's publicly accessible contents and determine whether it contains a menu PDF or menu images. If you can reliably access an actual menu file, you may also build a beautiful in-page menu preview or modal.

However:
- Do not invent menu items or prices.
- Do not assume that a Google Drive folder is a single PDF.
- If the contents cannot be retrieved reliably, simply link to the provided folder.
- Always provide a working external menu link.

### D. Social and community link cards

Below the main menu action, create three visually balanced link cards.

**Card 1: Instagram**
- Icon: official Instagram-style brand icon using SVG or a suitable icon library.
- Title: `Follow Our Journey`
- Subtitle: `Food, flavours & moments.`
- Destination: `https://www.instagram.com/chichas.fl/`

**Card 2: WhatsApp Community**
- Icon: WhatsApp brand icon using SVG or a suitable icon library.
- Title: `Join Our WhatsApp Community`
- Subtitle: `Stay connected with CHICHA’S.`
- Destination: the supplied WhatsApp invite URL.

**Card 3: Find Us**
- Icon: `MapPin`.
- Title: `Visit CHICHA’S`
- Subtitle: `Come hungry. Leave happy.`
- Destination: the supplied Google Maps directions URL.

Design these as polished cards with:
- Consistent spacing and corner radii.
- Restrained borders and shadows.
- Carefully aligned icons and text.
- A small arrow on the right.
- Subtle hover, focus, and pressed states.
- Consistent heights where practical.

Use brand colors selectively for Instagram and WhatsApp icons while ensuring they fit the overall visual identity.

All external links must work. Use appropriate `target="_blank"` and `rel="noopener noreferrer"` attributes where applicable.

### E. Location section

Add a compact location card with a `MapPin` icon.

Display:

**CHICHA’S**

304 Ashourian Ave, Unit 3-108  
St. Augustine, FL 32092

Include a clear `Get Directions` action that opens Google Maps.

Make the address easy to tap, select, copy, and read on a phone.

Do not embed a heavy interactive map unless it meaningfully improves the experience. A well-designed location card with a directions link is preferred.

### F. Opening hours section

Create a visually clear hours card with a `Clock` icon.

Display:

**Opening Hours**

Monday – Thursday  
11:00 AM – 9:30 PM

Friday – Sunday  
10:00 AM – 10:00 PM

Requirements:
- Use America/New_York as the timezone.
- Optionally highlight the current day.
- If implementing an Open Now / Closed indicator, calculate it correctly using the restaurant's local time and the listed hours.
- Account for the different weekday and weekend opening times.
- Do not hardcode the current date or current opening status.
- Handle daylight saving time correctly.
- Treat the stated hours as the business's published schedule, not a guarantee of holiday availability.

If the live status implementation would be unreliable, display the opening hours without an Open Now / Closed label.

### G. Footer

Create a restrained footer with:
- The CHICHA’S brand name or supplied logo.
- `Indian Street Food & Boba`.
- Instagram and WhatsApp icon links.
- The city and state: `St. Augustine, Florida`.
- A subtle copyright notice using the current year dynamically.

Keep the footer compact and visually consistent with the selected theme.

---

## 6. Icon Requirements — Absolutely No Emojis

Do not use emojis anywhere in the interface.

Use professional icons from `lucide-react` for general interface elements:
- `Sun`
- `Moon`
- `Utensils`
- `BookOpen`
- `ArrowUpRight`
- `ArrowRight`
- `MapPin`
- `Clock`
- `ExternalLink`
- `ChevronRight`
- `Instagram` or an appropriate official Instagram SVG
- `MessageCircle` or an appropriate official WhatsApp SVG

Use official brand SVGs when a recognizable Instagram or WhatsApp logo is important. Do not approximate brand logos with unrelated generic icons.

Keep icon sizes, stroke widths, alignment, and spacing consistent.

Icons must complement the text, not replace important labels.

---

## 7. Responsive Design

The website must be mobile-first and fully responsive.

### Mobile
- Optimize for screens from 320px upwards.
- Use a centered, narrow content column with comfortable side padding.
- Make every main action easy to tap with one thumb.
- Ensure primary buttons are at least approximately 48px high.
- Use readable typography without horizontal scrolling.
- Keep the hero compact enough that visitors can discover the menu quickly.
- Avoid giant empty spaces and unnecessary animation.
- Make the cards feel polished and touch-friendly.

### Tablet
- Preserve the centered composition.
- Use appropriate whitespace.
- Avoid stretching cards across excessive widths.

### Desktop
- Use a content width of approximately 440–560px for the central link-in-bio column.
- Add subtle decorative illustrations in the surrounding space.
- Keep the main content centered and visually balanced.
- Avoid turning the page into a conventional wide corporate website.

Test at approximately 320px, 375px, 390px, 768px, 1024px, and 1440px viewport widths.

---

## 8. Animation and Microinteractions

Use restrained, premium motion.

Implement:
- A gentle hero entrance animation.
- A subtle staggered reveal for the link cards.
- A small lift or border-color change on hover for desktop.
- Smooth theme transitions.
- A subtle arrow movement when a card is hovered.
- Clear active and keyboard-focus states.

Use CSS transitions or Framer Motion if it is already installed or clearly beneficial.

Respect `prefers-reduced-motion`.

Do not use:
- Excessive bouncing.
- Flashing gradients.
- Constantly moving backgrounds.
- Heavy parallax.
- Overly elaborate loading animations.
- Motion that delays access to the menu.

The website must feel fast and responsive.

---

## 9. Technical Stack

Build the website using:

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- `lucide-react` for icons.
- CSS custom properties for theme tokens.

Use a clean component architecture, for example:

- `App.tsx`
- `components/Header.tsx`
- `components/Hero.tsx`
- `components/LinkCard.tsx`
- `components/BusinessInfo.tsx`
- `components/OpeningHours.tsx`
- `components/Footer.tsx`
- `hooks/useTheme.ts`
- `index.css`

You may simplify the component structure if that produces a cleaner implementation.

Keep external URLs, opening hours, brand colors, and other business information in a centralized configuration file.

Write clean, maintainable TypeScript. Avoid unnecessary dependencies.

If an existing project is already present in the working directory, inspect it first and adapt the existing setup rather than blindly replacing files.

If no project exists, initialize the project with the necessary dependencies and configuration.

---

## 10. Accessibility and Quality

Implement:
- Semantic HTML.
- Accessible button labels.
- Keyboard navigation.
- Visible focus indicators.
- Appropriate color contrast in both themes.
- Meaningful image alt text.
- Correct link semantics.
- Reduced-motion support.
- Proper external-link handling.
- No broken links or placeholder buttons.

Use the supplied logo as a local asset, such as `/public/images/chichas-logo.jpeg`, after placing the provided image in the appropriate public directory.

Do not reference a logo path that does not actually exist.

Use the supplied image as the actual brand asset rather than replacing it with a text approximation.

---

## 11. Performance and SEO

Optimize for quick loading from social media browsers and mobile devices.

Requirements:
- Minimize unnecessary JavaScript.
- Avoid large background images.
- Prefer lightweight SVG decorations.
- Avoid unnecessary third-party scripts.
- Provide a descriptive page title: `CHICHA’S | Indian Street Food & Boba in St. Augustine`.
- Add a concise meta description.
- Include a suitable theme color.
- Add Open Graph metadata where appropriate.
- Use the supplied logo for social previews if a publicly accessible absolute image URL is available after deployment.
- Ensure the website works when opened directly from Instagram's in-app browser.

Do not add fake structured data, fabricated ratings, or unverified business claims.

---

## 12. Final Design Polish

Before declaring the website finished, check the following:

1. The first screen immediately communicates the CHICHA’S brand.
2. The logo is prominent and retains its original proportions.
3. The menu is the clearest primary action.
4. Instagram, WhatsApp, directions, and menu links all work.
5. Both light and dark themes look intentionally designed.
6. The decorative background is subtle and visually coherent.
7. The layout works beautifully on narrow phones.
8. The page feels like a premium restaurant brand, not a template.
9. The interface contains no emojis.
10. No unsupported menu items, prices, contact details, or business claims have been added.
11. All displayed business hours and the address match the supplied information.
12. There are no console errors, broken assets, or horizontal overflow.
13. The final page loads quickly and provides immediate access to the menu.

---

## 13. Execution Instructions

Do not stop after producing a design explanation, a wireframe, or a code sample.

**Build the actual working website in the available project environment.**

Start by inspecting the project files and locating the uploaded logo. Then implement the design, install any required dependencies, run the development or production build, and fix any errors you encounter.

If browser preview or screenshot tools are available, inspect the result at both mobile and desktop sizes and refine the visual design.

Deliver:
- The complete working React + TypeScript source code.
- All necessary project configuration.
- The finished responsive UI.
- The functional light/dark theme switch.
- Working menu, Instagram, WhatsApp, and directions links.
- Clear instructions to run and deploy the website to Vercel.

Make thoughtful design decisions independently. Prioritize visual quality, mobile usability, brand consistency, and functional completeness.

The final result should be something the owner of CHICHA’S would proudly put in their Instagram bio.

@chichasLogo.jpeg - check the logo if possible write the crpt to create perfect logo for moible and desktop also 