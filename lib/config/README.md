# SceneYard Branding Configuration

This directory contains the branding guidelines and design tokens for SceneYard.

## Brand Colors

### Primary Color
- **HEX**: `#7558f8`
- **RGB**: `117, 88, 248`
- **Usage**: Primary actions, links, brand elements

### Secondary Colors
- **Cyan**: `#00fff0` - Highlights, accents
- **Yellow**: `#ffd53e` - Warnings, attention
- **Purple**: `#d77bff` - Alternative accents

### Neutral Colors
- **White**: `#e8eaf6` - Light backgrounds, text on dark
- **Black**: `#0f111a` - Dark backgrounds, primary text

## Typography

### Font Family
**BR Sonoma** - Primary font family for all text

### Font Weights
- **Light**: 300
- **Regular**: 400 (default)
- **Medium**: 500
- **SemiBold**: 600
- **Bold**: 700

## Usage in Code

### Using Brand Colors in TypeScript

```typescript
import { brandColors, brandFonts } from "@/lib/config/branding";

// Access colors
const primaryColor = brandColors.primary.DEFAULT; // #7558f8
const cyanColor = brandColors.secondary.cyan; // #00fff0

// Access fonts
const fontFamily = brandFonts.family.brSonoma;
const boldWeight = brandFonts.weights.bold; // 700
```

### Using in Tailwind CSS

The brand colors are automatically available in Tailwind through CSS variables:

```tsx
// Primary color
<button className="bg-primary text-white">
  Click me
</button>

// Secondary colors
<div className="bg-secondary-cyan">Cyan background</div>
<div className="bg-secondary-yellow">Yellow background</div>
<div className="bg-secondary-purple">Purple background</div>

// Neutral colors
<div className="bg-brand-white text-brand-black">
  Light theme
</div>
<div className="bg-brand-black text-brand-white">
  Dark theme
</div>
```

### Using CSS Variables

```css
/* In your CSS/SCSS files */
.my-element {
  color: var(--color-primary);
  background: var(--color-secondary-cyan);
  font-family: var(--font-sans);
  font-weight: var(--font-weight-semibold);
}
```

### Using Inline Styles

```tsx
<div style={{ 
  color: 'var(--color-primary)',
  fontWeight: 'var(--font-weight-bold)'
}}>
  Styled text
</div>
```

## Font Setup

### Adding BR Sonoma Font

1. **Add font files** to `public/fonts/`:
   ```
   public/fonts/
   ├── BRSonoma-Light.woff2
   ├── BRSonoma-Regular.woff2
   ├── BRSonoma-Medium.woff2
   ├── BRSonoma-SemiBold.woff2
   └── BRSonoma-Bold.woff2
   ```

2. **Define @font-face** in `app/globals.css`:
   ```css
   @font-face {
     font-family: 'BR Sonoma';
     src: url('/fonts/BRSonoma-Light.woff2') format('woff2');
     font-weight: 300;
     font-style: normal;
     font-display: swap;
   }
   
   @font-face {
     font-family: 'BR Sonoma';
     src: url('/fonts/BRSonoma-Regular.woff2') format('woff2');
     font-weight: 400;
     font-style: normal;
     font-display: swap;
   }
   
   @font-face {
     font-family: 'BR Sonoma';
     src: url('/fonts/BRSonoma-Medium.woff2') format('woff2');
     font-weight: 500;
     font-style: normal;
     font-display: swap;
   }
   
   @font-face {
     font-family: 'BR Sonoma';
     src: url('/fonts/BRSonoma-SemiBold.woff2') format('woff2');
     font-weight: 600;
     font-style: normal;
     font-display: swap;
   }
   
   @font-face {
     font-family: 'BR Sonoma';
     src: url('/fonts/BRSonoma-Bold.woff2') format('woff2');
     font-weight: 700;
     font-style: normal;
     font-display: swap;
   }
   ```

3. **Font is already configured** in `globals.css` as the default sans-serif font.

## Color Palette Reference

| Color Name | HEX | RGB | Usage |
|------------|-----|-----|-------|
| Primary | `#7558f8` | `117, 88, 248` | Primary actions, brand |
| Secondary Cyan | `#00fff0` | `0, 255, 240` | Highlights, accents |
| Secondary Yellow | `#ffd53e` | `255, 213, 62` | Warnings, attention |
| Secondary Purple | `#d77bff` | `215, 123, 255` | Alternative accents |
| Brand White | `#e8eaf6` | `232, 234, 246` | Light backgrounds |
| Brand Black | `#0f111a` | `15, 17, 26` | Dark backgrounds |

## Design Tokens

All design tokens are centralized in `branding.ts` and automatically applied through:
- CSS variables in `globals.css`
- Tailwind CSS theme configuration
- TypeScript exports for programmatic access

## Dark Mode

The application automatically switches between light and dark themes based on user preference:

```css
/* Light mode (default) */
--background: var(--brand-white);
--foreground: var(--brand-black);

/* Dark mode */
@media (prefers-color-scheme: dark) {
  --background: var(--brand-black);
  --foreground: var(--brand-white);
}
```

## Best Practices

1. **Always use design tokens** instead of hardcoded colors
2. **Use semantic color names** (background, foreground) for theme-aware components
3. **Use brand colors** (primary, secondary-*) for brand-specific elements
4. **Maintain consistent font weights** across the application
5. **Test in both light and dark modes**

## Examples

### Button Component

```tsx
export function Button({ children, variant = 'primary' }) {
  const variants = {
    primary: 'bg-primary text-white hover:opacity-90',
    secondary: 'bg-secondary-cyan text-brand-black hover:opacity-90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };
  
  return (
    <button className={`px-6 py-3 rounded-lg font-semibold transition-all ${variants[variant]}`}>
      {children}
    </button>
  );
}
```

### Card Component

```tsx
export function Card({ children }) {
  return (
    <div className="bg-background text-foreground border border-primary/20 rounded-xl p-6 shadow-lg">
      {children}
    </div>
  );
}
```

### Typography

```tsx
export function Heading({ children, level = 1 }) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const weights = {
    1: 'font-bold',
    2: 'font-semibold',
    3: 'font-semibold',
    4: 'font-medium',
  };
  
  return (
    <Tag className={`text-foreground ${weights[level]}`}>
      {children}
    </Tag>
  );
}
```
