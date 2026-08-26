export function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    // \p{M} keeps combining marks (e.g. Gujarati matras/virama) attached to
    // their base letter — without it this strips them and corrupts Indic
    // script words, since they're categorized as Marks, not Letters.
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    }
  }
  return dp[m][n]
}

function wordsRoughlyMatch(a: string, b: string): boolean {
  if (a === b) return true
  const tolerance = a.length > 5 || b.length > 5 ? 2 : 1
  return levenshtein(a, b) <= tolerance
}

/**
 * Fraction (0-1) of `target`'s words found — exactly or as a near-miss — in
 * `buffer`. Word-overlap rather than whole-string Levenshtein, since ASR
 * transcripts are noisy and words can arrive out of order across chunks.
 */
export function similarity(target: string, buffer: string): number {
  const targetWords = normalizeForMatch(target).split(' ').filter(Boolean)
  const bufferWords = normalizeForMatch(buffer).split(' ').filter(Boolean)
  if (targetWords.length === 0) return 0
  let hits = 0
  for (const tw of targetWords) {
    if (bufferWords.some((bw) => wordsRoughlyMatch(tw, bw))) hits++
  }
  return hits / targetWords.length
}

export const MATCH_THRESHOLD = 0.7
