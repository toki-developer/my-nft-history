export const convertExponentialToDecimal = (num: number) => {
  if (num.toString().includes("e")) {
    return num.toLocaleString("fullwide", { useGrouping: false });
  }
  return num;
};
