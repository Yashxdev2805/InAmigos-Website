/**
 * InAmigos Foundation - Phase 4 Accessibility (WCAG 2.1 AA) Engine
 * Provides contrast ratio validation, ARIA attribute helpers, and keyboard focus trap logic.
 */

/**
 * Calculates relative luminance of RGB color
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates WCAG 2.1 Contrast Ratio between two RGB colors
 * WCAG 2.1 AA Minimum: 4.5:1 for normal text, 3:1 for large text
 */
export function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Validates if color contrast meets WCAG 2.1 Level AA (4.5:1 ratio)
 */
export function isWCAGAACompliant(rgb1: [number, number, number], rgb2: [number, number, number]): boolean {
  return getContrastRatio(rgb1, rgb2) >= 4.5;
}

/**
 * Focus Trap Manager for accessible modal dialogs
 */
export function trapFocus(element: HTMLElement, e: KeyboardEvent) {
  if (e.key !== 'Tab') return;

  const focusables = element.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusables.length === 0) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      last.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  }
}
