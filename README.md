# Slick Carousel

![Slick Carousel toolbox icon](src/SlickCarousel.icon.png)

A responsive, fully-featured carousel/slider widget for Mendix, powered by [react-slick](https://react-slick.neostack.com/). Supports both **static** (fixed slides) and **dynamic** (data source–driven) content, with rich configuration and easy CSS-variable styling.

---

## Features

- **Static mode** — configure a fixed list of slides directly in Studio Pro, each with its own widget content drop zone and optional caption
- **Dynamic mode** — bind slides to any Mendix list, with full widget content templating per item, image support, and per-slide click actions
- Dot and arrow navigation
- Autoplay with configurable speed
- Fade or slide transitions
- Vertical sliding
- Center mode (peek at adjacent slides)
- Adaptive height and variable width
- Lazy loading for images
- Drag/swipe support
- Responsive breakpoints — configure slides to show/scroll independently for desktop, tablet, and phone
- Five built-in arrow style presets (Default, Chevron, Round, Square, Minimal) plus fully custom drop zones
- Disabled arrow styling when infinite loop is off and navigation is at a boundary
- Events: before/after slide change, current slide index tracking
- Easy theming via CSS custom properties (no rebuild needed)

---

## Requirements

- Mendix Studio Pro **11.x** (React client)
- Web profile only

---

## Installation

1. Download the `.mpk` file from the Marketplace.
2. In Studio Pro, go to **App > Import module package…** and select the downloaded file.
3. The widget `SlickCarousel` is now available in the widget toolbox under **Display**.

---

## Quick Start

### Static Carousel (default)

1. Drop the **Slick Carousel** widget onto a page.
2. The **Type** defaults to **Static**.
3. In the **Slide list**, click **New** to add a slide.
4. Inside each slide, drop any Mendix widget(s) into the **Content** drop zone (images, charts, text, containers — anything).
5. Optionally enter a **Caption** (supports text templates with attribute values).
6. Repeat for each slide.
7. Run the app.

### Dynamic Carousel

1. Drop the **Slick Carousel** widget onto a page.
2. Set **Type** to **Dynamic**.
3. Configure a **Data source** (any list-returning source: database, association, microflow, etc.).
4. In the **Content** drop zone, design the slide template using the item's attributes (same as a list view template).
5. Optionally set **Image URL attribute** and **Image alt text attribute** if you want simple image slides without a content template.
6. Optionally configure **On slide click** to trigger a microflow or nanoflow per item.
7. Run the app.

---

## Property Reference

### General

| Property | Default | Description |
|---|---|---|
| **Type** | Static | `Static`: fixed slides configured in Studio Pro. `Dynamic`: slides from a data source. |

### Static Content

| Property | Description |
|---|---|
| **Slide list** | List of slides. Add one entry per slide. Each slide has a **Content** drop zone and an optional **Caption**. |
| — Content | Widget content area for this slide. Drop any Mendix widget(s) here. |
| — Caption | Optional text (supports text templates) displayed below the slide. |

### Dynamic Content

| Property | Description |
|---|---|
| **Data source** | The Mendix list that drives the slides (database, microflow, association, etc.). |
| **Content** | Widget template rendered per item (like a list view template). Takes priority over Image URL. |
| **Image URL attribute** | String attribute containing the slide image URL. Used when no Content template is set. |
| **Image alt text attribute** | String attribute for the image `alt` text. |
| **On slide click** | Action (microflow/nanoflow) triggered when a slide is clicked. Receives the current item. |

### Events

| Property | Description |
|---|---|
| **Current slide** | Integer attribute that is updated with the zero-based index of the active slide whenever it changes. |
| **Before change** | Action triggered just before the slide transitions. |
| **After change** | Action triggered after the slide transition completes. |

### Carousel Behavior

| Property | Default | Description |
|---|---|---|
| **Autoplay** | false | Automatically advance slides on a timer. |
| **Autoplay speed (ms)** | 3000 | Delay between auto-advances in milliseconds. |
| **Animation speed (ms)** | 500 | Duration of the slide/fade transition in milliseconds. |
| **Infinite loop** | true | Loop back to the first slide after the last. |
| **Fade transition** | false | Use a crossfade instead of a slide. Works only when **Slides to show** = 1. |
| **Vertical** | false | Slide vertically instead of horizontally. |
| **Pause on hover** | true | Pause autoplay when the mouse is over the carousel. |
| **Pause on dots hover** | false | Pause autoplay when hovering over the dot navigation. |
| **Draggable** | true | Allow mouse drag and touch swipe to navigate. |
| **Lazy load** | None | `None`: load all slides immediately. `On demand`: load when the slide is about to be shown. `Progressive`: load in the background. |

### Slides to Show / Scroll

| Property | Default | Description |
|---|---|---|
| **Initial slide** | 0 | Zero-based index of the slide shown on first load. Set to `3` to start on the fourth slide. |
| **Slides to show (desktop)** | 1 | Number of slides visible at once on desktop screens (>992 px). |
| **Slides to show (tablet)** | 0 | Slides visible on tablet screens (≤992 px). Set to `0` to use the desktop value. |
| **Slides to show (phone)** | 0 | Slides visible on phone screens (≤768 px). Set to `0` to use the desktop value. |
| **Slides to scroll (desktop)** | 1 | Number of slides advanced per navigation action on desktop screens (>992 px). |
| **Slides to scroll (tablet)** | 0 | Slides scrolled on tablet screens (≤992 px). Set to `0` to use the desktop value. |
| **Slides to scroll (phone)** | 0 | Slides scrolled on phone screens (≤768 px). Set to `0` to use the desktop value. |

### Navigation

| Property | Default | Description |
|---|---|---|
| **Show dots** | true | Display dot indicators below the carousel. |
| **Show arrows** | false | Display previous/next arrow buttons. |
| **Arrow style** | Default | Visual style of the navigation arrows. See [Custom arrow styles](#custom-arrow-styles) below. |
| **Previous arrow content** | — | Widget drop zone for the previous arrow. Visible only when Arrow style is **Custom**. |
| **Next arrow content** | — | Widget drop zone for the next arrow. Visible only when Arrow style is **Custom**. |

### Custom arrow styles

The **Arrow style** property lets you choose between five built-in presets or take full creative control with your own content.

| Value | Description |
|---|---|
| **Default** | Semi-transparent dark circle with the standard slick arrow icon. Fully themeable via CSS variables. |
| **Chevron** | No button background — just a thin open chevron drawn with CSS borders. Clean and modern, works well on light and dark slides. |
| **Round** | Outlined circle with no fill. The border and icon color both follow `--slick-arrow-color`. Fills in on hover. |
| **Square** | Rectangular button with a 4 px radius instead of a circle. Same look as Default, but squared off. |
| **Minimal** | No button shell at all — just the arrow icon at 55 % opacity, brightening to full on hover. Ideal when you want the arrows to be unobtrusive. |
| **Custom** | Reveals two widget drop zones (**Previous arrow content** and **Next arrow content**). Drop any Mendix widget(s) into each slot — a styled container, an icon widget, an SVG image — and that becomes the clickable arrow button. |

#### Using the Custom style

1. Set **Show arrows** to **Yes** and **Arrow style** to **Custom**.
2. Two drop zones appear in the widget properties: **Previous arrow content** and **Next arrow content**.
3. Drop your chosen widget(s) into each zone. A single **Image** widget with an SVG icon is a common choice, as is a **Container** with a custom class.
4. The widget wraps your content in a flex-centered div that receives the standard slick class names (`slick-prev` / `slick-next`) for positioning. All the existing CSS variables for positioning and the `left`/`right` offsets still apply, so you can fine-tune placement the same way as with any other arrow style.
5. When **Infinite loop** is off and the carousel reaches the first or last slide, the corresponding arrow is automatically faded to `--slick-arrow-disabled-opacity` (default `0.35`) and made non-clickable — your content does not need to handle this.

> **Tip:** The custom arrow content shares the same page context as the rest of the widget, so you can use dynamic expressions, conditional visibility, or any Mendix widget inside the drop zone.

### Display

| Property | Default | Description |
|---|---|---|
| **Center mode** | false | Show partial views of adjacent slides. |
| **Center padding** | 50px | Side padding in center mode (CSS value, e.g. `50px`, `10%`). |
| **Adaptive height** | false | Resize the carousel height to match the active slide's height. |
| **Variable width** | false | Allow slides to have different widths (set width on slide elements via CSS). |

---

## Styling

The widget uses **CSS custom properties** so you can theme arrows and dots without touching widget code.

### Per widget instance

Set variables in the **Style** field of the widget in Studio Pro:

```
--slick-arrow-bg: #0078d4; --slick-arrow-color: white; --slick-dot-color-active: #0078d4;
```

### App-wide (theme)

Add to your app's `theme/web/custom-variables.css` (or equivalent):

```css
.slick-carousel-widget {
    --slick-arrow-bg: #0078d4;
    --slick-arrow-bg-hover: #005fa3;
    --slick-arrow-color: white;
    --slick-arrow-size: 24px;
    --slick-dot-color: #ccc;
    --slick-dot-color-active: #0078d4;
    --slick-dot-size: 10px;
}
```

### Available CSS variables

| Variable | Default | Description |
|---|---|---|
| `--slick-arrow-bg` | `rgba(0,0,0,0.4)` | Arrow button background color |
| `--slick-arrow-bg-hover` | `rgba(0,0,0,0.7)` | Arrow button background on hover |
| `--slick-arrow-bg-disabled` | `rgba(0,0,0,0.15)` | Arrow background when disabled (infinite loop off, at first/last slide). Not used by the Custom style. |
| `--slick-arrow-color-disabled` | `rgba(255,255,255,0.4)` | Arrow icon color when disabled. Not used by the Custom style. |
| `--slick-arrow-disabled-opacity` | `0.35` | Opacity of the entire arrow when disabled in **Custom** style. |
| `--slick-arrow-color` | `white` | Arrow icon color |
| `--slick-arrow-size` | `24px` | Arrow icon font size |
| `--slick-dot-color` | `#000` | Dot color (inactive) |
| `--slick-dot-color-active` | same as `--slick-dot-color` | Dot color (active/current slide) |
| `--slick-dot-size` | `10px` | Dot size |
| `--slick-vertical-height` | `400px` | Fixed height of the carousel in vertical mode |
| `--slick-vertical-ratio` | _(unset)_ | Aspect ratio of the **slide content area** as `width/height` — same notation as CSS `aspect-ratio` (e.g. `16/9` = landscape, `4/3`, `1/1` = square, `3/4` = portrait, `100/33` = 33% of width). Decimal also accepted (e.g. `0.5625`). Height is computed from the widget's actual rendered width and recalculates on resize. Caption height is measured from the DOM and added automatically. |

For further customisation, target the standard slick-carousel CSS classes (`.slick-slider`, `.slick-track`, `.slick-slide`, etc.) scoped inside `.slick-carousel-widget`.

---

## Tips & Gotchas

- **Fade + multiple slides**: Fade transition only works correctly when **Slides to show** is 1. The widget enforces this automatically and will show a warning in Studio Pro.
- **Dots spacing**: The widget reserves `40px` of bottom padding for the dot navigation. If you disable dots, you can reclaim that space with `.slick-carousel-widget .slick-slider { padding-bottom: 0; }` in your theme.
- **Adaptive height with variable content**: When using Adaptive height with dynamic content, ensure all slide content is rendered synchronously. Async-loaded content (like charts) may not trigger a height recalculation.
- **Current slide index**: The **Current slide** attribute is zero-based (first slide = 0). Use it to drive conditional visibility or other logic in your page.
- **Vertical mode**: Requires a fixed height. The default is `400px`; override with `--slick-vertical-height: 600px` in the widget's style. Use `--slick-vertical-ratio` for an aspect-ratio-based height that recalculates on resize. In vertical mode, dots move to the left side and arrows reposition to top/bottom center.
- **Initial slide**: The **Current slide** attribute is not pre-set to the initial slide index at mount — it only updates when the slide changes. If you need the attribute to reflect the starting slide immediately, set it via a nanoflow on page load.
- **Disabled arrows**: When **Infinite loop** is off, the previous arrow is automatically dimmed when on the first slide and the next arrow when on the last. Style via `--slick-arrow-bg-disabled` and `--slick-arrow-color-disabled`.

---

## Changelog

### 1.2.0

- Five built-in arrow style presets: Default, Chevron, Round, Square, Minimal
- Custom arrow style: widget drop zones for fully custom previous/next arrow content
- New CSS variable `--slick-arrow-disabled-opacity` for the Custom style disabled state

### 1.1.0

- Responsive breakpoints: configure slides to show and slides to scroll independently for desktop, tablet, and phone
- **Initial slide** property to start the carousel at any slide index
- Disabled arrow styling when **Infinite loop** is off and navigation reaches the first or last slide (`--slick-arrow-bg-disabled`, `--slick-arrow-color-disabled`)
- Vertical mode: `--slick-vertical-ratio` CSS variable for aspect-ratio-based height that recalculates on resize; caption height is measured automatically
- Vertical mode: dots repositioned to the left side; overflow clipped so dots never escape the widget boundary
- Widget placed in the **Display** toolbox category with a custom icon

### 1.0.0

- Initial release
- Static and dynamic carousel modes
- Full react-slick feature set exposed as widget properties
- CSS custom property theming for arrows and dots
- Events: before/after change, current slide tracking

---

## License

Apache-2.0

## Credits

Built with [react-slick](https://react-slick.neostack.com/) and [slick-carousel](https://kenwheeler.github.io/slick/).
