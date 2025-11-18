
/**
 * Formats a number with commas as thousands separators.
 * @param num The number to format.
 * @returns A string representation of the number with commas.
 */
export const formatNumber = (num: number): string => {
  if (num === null || num === undefined) return '';
  return num.toLocaleString('en-US');
};

/**
 * Formats a number representing grams of gold to a string with " گرم".
 * Rounds to 2 decimal places if necessary.
 * @param goldAmount The amount of gold in grams.
 * @returns A formatted string.
 */
export const formatGold = (goldAmount: number): string => {
  const rounded = Math.round(goldAmount * 100) / 100;
  return `${formatNumber(rounded)}`;
};
