export const calculateEggCycles = (hatchCount: number | undefined) => {
  if (typeof hatchCount === "undefined") return "";
  return `${hatchCount * 256} steps`;
};
