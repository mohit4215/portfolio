# Mohit Agarwal — Personal Developer Portfolio

Production-ready developer portfolio for **Mohit Agarwal** (MLOps & Full-Stack Engineer, Undergraduate at AKGEC, Founder of Quest).

**Live Production Site:** [https://portfolio-two-drab.vercel.app/](https://portfolio-two-drab.vercel.app/)

---

## 🚀 Architecture & Features

- **Semantic HTML5 & Structured Data:** Standardized semantic layout with Person / ProfilePage JSON-LD, Open Graph, and Twitter Cards.
- **Compiled Tailwind CSS:** Built with standalone Tailwind CLI into `tailwind.css` (10.7 KB minified), completely removing the runtime CDN script.
- **Design System:** Custom Editorial Brutalism & Glassmorphic dark theme (`style.css`), strictly using high-contrast tokens (WCAG AA ≥ 4.5:1).
- **Optimized Typography:** Trimmed font footprint down to 2 families (Inter & Space Grotesk) across 5 weights with `display=swap`.
- **Responsive WebP Images:** Dual-variant pipeline generating 400px thumbnails (<50 KB) and max-1600px inspect views (<200 KB) in WebP with JPEG fallback and intrinsic dimensions.
- **Failure-Safe Intro:** Non-blocking intro overlay (≤1.0s) with `<noscript>` fallback, `sessionStorage` session-skip, and instant motion bypass.
- **WCAG AA Accessibility:**
  - Accessible `#gallery-lightbox` with focus trapping, `inert` when closed, Escape key handling, and focus restoration to trigger thumbnails.
  - `#mobile-drawer` with `visibility: hidden` & `inert`, `aria-expanded` toggle state, body scroll lock, and keyboard navigation.
  - Visible `:focus-visible` 2px cyan focus indicators with offset.
- **Edge Caching:** `vercel.json` configured with 1-year immutable caching for static assets.

---

## 🛠️ Build & Maintenance

### 1. Rebuild Tailwind Stylesheet
```bash
./tailwindcss.exe -i tailwind-input.css -o tailwind.css --minify
```

### 2. Resume PDF
Place the official `resume.pdf` at the repository root to automatically serve the "Download CV" buttons in the Hero and Contact sections.
