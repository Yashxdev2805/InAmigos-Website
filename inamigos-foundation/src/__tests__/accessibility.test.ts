import { getContrastRatio, isWCAGAACompliant } from '../lib/accessibility';

describe('Phase 4 Accessibility & WCAG 2.1 AA Tests', () => {
  test('Pure Black on Pure White meets WCAG AA (Ratio 21:1)', () => {
    const black: [number, number, number] = [0, 0, 0];
    const white: [number, number, number] = [255, 255, 255];
    const ratio = getContrastRatio(black, white);

    expect(ratio).toBeGreaterThanOrEqual(21);
    expect(isWCAGAACompliant(black, white)).toBe(true);
  });

  test('Emerald 700 (#047857) on White meets WCAG AA (Ratio >= 4.5:1)', () => {
    const emerald700: [number, number, number] = [4, 120, 87];
    const white: [number, number, number] = [255, 255, 255];

    expect(isWCAGAACompliant(emerald700, white)).toBe(true);
  });
});
