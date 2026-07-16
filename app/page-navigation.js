export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const CJK_CLOSING_PUNCTUATION = /[、。，．！？!?]$/u;

/**
 * @param {string} line
 * @returns {{ tokens: string[], usesWordSpacing: boolean }}
 */
export function tokenizeHeroLine(line) {
  const usesWordSpacing = line.includes(" ");
  if (usesWordSpacing) return { tokens: line.split(" "), usesWordSpacing };

  const glyphs = Array.from(line);
  if (glyphs.length < 4 || !CJK_CLOSING_PUNCTUATION.test(line)) {
    return { tokens: glyphs, usesWordSpacing };
  }

  return {
    tokens: [...glyphs.slice(0, -3), glyphs.slice(-3).join("")],
    usesWordSpacing,
  };
}

/**
 * @param {Window} [view]
 */
export function scrollPageToTop(view = window) {
  const behavior = view.matchMedia?.(REDUCED_MOTION_QUERY).matches ? "auto" : "smooth";

  try {
    view.scrollTo({ top: 0, left: 0, behavior });
  } catch {
    view.scrollTo(0, 0);
  }
}
