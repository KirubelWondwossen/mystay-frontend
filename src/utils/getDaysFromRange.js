export function getDaysFromRange(range) {
  if (!range?.from || !range?.to) return 0;

  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  return Math.round((range.to - range.from) / MS_PER_DAY) + 1;
}
