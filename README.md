# `~/0xmaxw08`

> Personal portfolio. Monochrome, terminal-flavored, built for smoothness.

Live at **[portfolio-max-nu.vercel.app](https://portfolio-max-nu.vercel.app)**

---

## `$` cat about.txt

A single-page portfolio for **Manvendra Snehasish** (`0xmaxw08`). Dark mode, glassmorphic cards, terminal accents, and a buttery smooth scroll. The whole thing runs on a monochrome palette with one green accent dot, because that's the only color a terminal needs.

Built from scratch with a focus on motion and feel. Every section fades in with intent, the hero types itself out on loop, and the cursor leaves a trail behind it.

---

## `$` ls features

| Feature | What it does |
|---|---|
| **Custom cursor + trail** | Native cursor hidden, replaced with a lagging ring and a chain-lerp snake trail that ends in a green dot |
| **Lenis smooth scroll** | 1.5s weighted scroll with eased momentum, no janky wheel jumps |
| **Typewriter hero** | Loops through `Manvendra Snehasish` → backspace → `max` at 60fps with eased typing |
| **Scroll-driven timeline** | A white streak grows down the Experience section as you scroll, with a glowing head riding the tip |
| **Reveal-on-scroll** | Every section fades and slides up cleanly, plays once, never reverses |
| **Back to top** | Appears after 700px of scroll, glides home via Lenis |
| **Kitty mode 🐱** | Type `kitty` anywhere for a full theme swap with a sparkle burst, polka dots, and an animated mascot |
| **Favicon** | Terminal-style `max.` square with the green accent dot |

---

## `$` ls -la stack

**Core**
- [React 19](https://react.dev) — UI
- [Vite 8](https://vitejs.dev) — build tool + dev server
- [Tailwind CSS 3](https://tailwindcss.com) — utility styling

**Motion**
- [GSAP 3](https://gsap.com) + ScrollTrigger — timeline animations
- [Lenis](https://lenis.darkroom.engineering) — smooth scroll

**Type**
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — display
- [Inter](https://fonts.google.com/specimen/Inter) — body
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — labels, chrome

**Hosting**
- [Vercel](https://vercel.com) — auto-deploy from `main`

---

## `$` tree -L 2 src

