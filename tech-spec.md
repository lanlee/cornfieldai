# Cornfield.ai - Technical Specification

## Component Inventory

### shadcn/ui Components
- Button (for View buttons)
- Card (base for project cards)

### Third-party Components
None required - custom 3D carousel will be built from scratch

### Custom Components
1. **Carousel3D** - Main 3D carousel container
2. **CarouselCard** - Individual project card with 3D transforms
3. **Navigation** - Fixed header navigation
4. **Footer** - Fixed footer with links
5. **ProjectDetail** - Project detail page view

---

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Page load fade-in | Framer Motion | AnimatePresence with initial/animate states | Low |
| 3D Carousel rotation | GSAP ScrollTrigger | Scroll-linked timeline controlling rotateY transforms | High |
| Card hover scale | CSS/Framer Motion | whileHover scale transform | Low |
| View button reveal | Framer Motion | AnimatePresence with opacity + translateY | Medium |
| Navigation scroll effect | React hooks | useScroll hook for background change | Low |
| Project detail transition | Framer Motion | Page transition with AnimatePresence | Medium |
| Parallax images | GSAP | ScrollTrigger with y transform | Medium |

---

## Animation Library Choices

### Primary: GSAP + ScrollTrigger
**Rationale:**
- Best-in-class scroll-linked animations
- Precise control over 3D transforms
- Excellent performance with hardware acceleration
- ScrollTrigger perfect for carousel rotation

### Secondary: Framer Motion
**Rationale:**
- React-native integration
- Excellent for component-level animations
- AnimatePresence for mount/unmount animations
- Simple hover/tap gestures

---

## Project File Structure

```
/mnt/okcomputer/output/app/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── Carousel3D.tsx
│   │   ├── CarouselCard.tsx
│   │   └── ProjectDetail.tsx
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   └── useMousePosition.ts
│   ├── data/
│   │   └── projects.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── images/
│       ├── assembo.jpg
│       ├── heyemmett.jpg
│       ├── cornfield.jpg
│       └── project-4.jpg
│       └── project-5.jpg
│       └── project-6.jpg
├── index.html
├── package.json
└── vite.config.ts
```

---

## Dependencies

### Core
- react
- react-dom
- typescript
- vite

### Animation
- gsap (with ScrollTrigger plugin)
- framer-motion

### Styling
- tailwindcss
- @tailwindcss/typography

### Utilities
- clsx (className utilities)
- date-fns (time formatting)

---

## 3D Carousel Technical Design

### Mathematical Model

**Card Positioning:**
- Cards arranged in a circle on the Y-axis
- Total cards: N
- Angle between cards: 360° / N
- Radius: calculated based on card width + gap

**Transform Formula:**
```
rotateY = baseAngle + (scrollProgress * 360)
translateZ = radius * cos(rotateY in radians)
translateX = radius * sin(rotateY in radians)
```

**Perspective:**
- Container: `perspective: 1000px`
- Cards: `transform-style: preserve-3d`
- Backface: `backface-visibility: hidden` (optional)

### Scroll Integration

**ScrollTrigger Setup:**
```javascript
ScrollTrigger.create({
  trigger: ".carousel-container",
  start: "top top",
  end: "+=2000",
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    // Update rotation based on self.progress
  }
})
```

### Performance Optimizations

1. **will-change**: Apply to transform properties
2. **GPU acceleration**: Use translate3d
3. **Debounced scroll**: Use GSAP's built-in optimization
4. **Lazy loading**: Load images as needed
5. **Reduced motion**: Respect prefers-reduced-motion

---

## Responsive Breakpoints

```javascript
const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
  wide: 1600
}
```

**Mobile Adaptation:**
- Carousel becomes horizontal scroll
- Reduced 3D effects
- Touch-friendly interactions

---

## State Management

### Local State
- Current project index (for carousel)
- Selected project (for detail view)
- Scroll progress
- Hover states

### No Global State Required
- Simple prop drilling sufficient
- URL params for project detail routing

---

## Build Configuration

### Vite Config
- Optimize GSAP imports
- Image optimization
- Code splitting for routes

### Output
- Static build to `dist/`
- All assets hashed for caching
- Optimized for deployment
