---
name: Ishaaro
colors:
  surface: '#f7faf8'
  surface-dim: '#d8dbd9'
  surface-bright: '#f7faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f2'
  surface-container: '#eceeed'
  surface-container-high: '#e6e9e7'
  surface-container-highest: '#e0e3e1'
  on-surface: '#181c1b'
  on-surface-variant: '#404846'
  inverse-surface: '#2d3130'
  inverse-on-surface: '#eef1ef'
  outline: '#707976'
  outline-variant: '#c0c8c5'
  surface-tint: '#38665e'
  primary: '#00342d'
  on-primary: '#ffffff'
  primary-container: '#1b4b43'
  on-primary-container: '#8abaaf'
  inverse-primary: '#a0d0c5'
  secondary: '#9e4216'
  on-secondary: '#ffffff'
  secondary-container: '#ff8c5a'
  on-secondary-container: '#722700'
  tertiary: '#2d2e2b'
  on-tertiary: '#ffffff'
  tertiary-container: '#434441'
  on-tertiary-container: '#b2b1ad'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bbece1'
  primary-fixed-dim: '#a0d0c5'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#1f4e46'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb598'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#7e2c00'
  tertiary-fixed: '#e4e2de'
  tertiary-fixed-dim: '#c8c6c3'
  on-tertiary-fixed: '#1b1c1a'
  on-tertiary-fixed-variant: '#474744'
  background: '#f7faf8'
  on-background: '#181c1b'
  surface-variant: '#e0e3e1'
typography:
  display-xl:
    fontFamily: ebGaramond
    fontSize: 96px
    fontWeight: '500'
    lineHeight: 100px
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: ebGaramond
    fontSize: 56px
    fontWeight: '500'
    lineHeight: 60px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: ebGaramond
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
  headline-sm:
    fontFamily: ebGaramond
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: plusJakartaSans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: plusJakartaSans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  hero-width: 60%
  card-gap: 32px
---

## Brand & Style

The design system for Ishaaro targets a cultured, intellectually curious audience seeking to master sign language through a premium, editorial lens. The brand personality is **Academic yet Expressive**, blending the structural rigor of traditional publishing with the fluid, kinetic energy of manual communication.

The visual style is **Premium Editorial**. It avoids the generic "tech" aesthetic in favor of a high-end magazine feel. This is achieved through:
- **Sharp Geometry:** Utilizing a roundedness of 0 to create a sense of architectural permanence and precision.
- **Asymmetric Composition:** Breaking the standard digital grid to mirror the organic movement of hands.
- **Hand-Drawn Interventions:** Using warm coral scribbles and circles to annotate the UI, humanizing the AI-driven experience and mimicking a student's handwritten notes.
- **Textural Depth:** Subtle teal hand-pose outlines layered behind content to reinforce the subject matter without cluttering the interface.

## Colors

This design system utilizes a sophisticated, high-contrast palette designed for long-form reading and clear visual signaling.

- **Primary (Deep Teal):** Used for primary branding, heavy typographic elements, and structural containers. It provides an authoritative, grounded foundation.
- **Accent (Warm Coral):** Reserved for "human" elements—hand-drawn annotations, calls to action, and highlighting progress. It provides a vibrant, energetic contrast to the teal.
- **Background (Off-White):** A warm, paper-like canvas that reduces eye strain and reinforces the editorial narrative.
- **Neutral:** A deep charcoal-green used for body text to ensure maximum legibility while maintaining the tonal harmony of the palette.
- **Semantic Colors:** Success, warning, and error states should be muted and integrated into the primary/secondary palette to avoid breaking the premium aesthetic.

## Typography

The typography strategy relies on a dramatic contrast between the classical elegance of **EB Garamond** and the modern, approachable clarity of **Plus Jakarta Sans**.

- **Display & Headlines:** Use EB Garamond for all major headings. At large scales (80px+), the serif details provide a premium, literary quality. Ensure tight tracking on larger sizes.
- **Body Text:** Plus Jakarta Sans provides high legibility for instructional content and interactive elements. Its soft terminals balance the sharp edges of the layout.
- **Technical/Stats:** JetBrains Mono is used for lesson progress, time stamps, and data points, providing a "notated" or "indexed" feel to the educational stats.
- **Editorial Flourish:** Use italics in EB Garamond for emphasis within body text or for captions to lean into the magazine aesthetic.

## Layout & Spacing

The layout philosophy is **Structured Asymmetry**. It uses a rigorous 12-column grid but frequently "breaks" it to create visual interest.

- **Hero Sections:** Feature a 60% width, left-aligned headline. The remaining 40% should remain largely negative space or be occupied by an overlapping "grid-breaking" image or video of a sign gesture.
- **Grid-Breaking:** Cards and content blocks should vary in height and vertical alignment. Use "hanging" elements that sit halfway between two grid rows.
- **Editorial Margins:** Use generous outer margins (64px+) on desktop to frame the content like a printed page. 
- **Responsive Reflow:** On mobile, the 60/40 split collapses into a stacked layout, but the left-alignment and oversized typography must be maintained to keep the brand's bold voice.

## Elevation & Depth

This design system rejects traditional shadows in favor of **Tonal Layering** and **Sharp Borders**.

- **Surface Strategy:** Depth is communicated through color blocks. The Background (#FDFBF7) is the base. Primary Teal (#1B4B43) is used for high-contrast "risen" containers.
- **Ghost Borders:** Use thin (1px) borders in the Primary color instead of shadows to define interactive areas.
- **Depth via Overlap:** Instead of Z-axis shadows, use physical overlap. A hand-drawn annotation (Coral) should always sit on the highest "layer," appearing as if it was drawn directly onto the glass of the screen.
- **Zero-Blur:** If a shadow is absolutely necessary for legibility, use a "Hard Shadow"—a solid color offset (e.g., 4px 4px 0px) in Primary Teal with no blur.

## Shapes

The shape language is **Brutalist and Architectural**. 

- **Hard Edges:** All buttons, cards, and input fields must have a corner radius of 0. This reinforces the "academic" and "serious" nature of the learning platform.
- **Annotation Contrast:** The only curved elements allowed are the "hand-drawn" Coral accents (circles, scribbles, arrows). These should appear intentionally imperfect and organic, providing a stark contrast to the rigid, square UI containers.
- **Iconography:** Use sharp-angled, stroke-based icons. Avoid rounded icon sets.

## Components

### Buttons
- **Primary:** Solid Deep Teal background, white Plus Jakarta Sans text (all caps, bold), 0px radius.
- **Secondary:** Transparent background, 2px Deep Teal border, 0px radius.
- **Human Note:** Some buttons may feature a hand-drawn Coral underline that extends slightly past the button's edge.

### Cards
- **Editorial Card:** High-contrast Teal background with White EB Garamond text. Varied sizes to facilitate the "grid-breaking" layout.
- **Learning Card:** Off-white background with a thin 1px Teal border. Used for lesson steps.

### Inputs & Selectors
- **Fields:** Simple bottom-border only (2px Teal) to mimic a lined notebook. Labels use JetBrains Mono in Teal.
- **Checkboxes:** Sharp squares. When active, they are filled with Coral and marked with a hand-drawn "X" scribble.

### Annotations (Unique Component)
- **The "Teacher's Pen":** A set of SVG overlays including circles for highlighting hand positions, strikethroughs for "common mistakes," and arrows for movement direction. These always use the Warm Coral (#FF8C5A) and have a variable line weight to look authentic.

### Lists
- Use JetBrains Mono for numbering (e.g., 01., 02.) to maintain the technical, indexed feel of a textbook.