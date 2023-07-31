export const CommaSeparator = { thousand: ",", decimal: "." };
export const DotSeparator = { thousand: ".", decimal: "," };
export const DecimalSeparators = new Map([
  ["en", CommaSeparator],
  ["de", DotSeparator],
  ["pt", CommaSeparator],
  ["es", CommaSeparator],
  ["ru", DotSeparator],
  ["uk", CommaSeparator],
]);
