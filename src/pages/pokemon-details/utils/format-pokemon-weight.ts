export const formatPokemonWeight = (weight: number | undefined) => {
  if (typeof weight === "undefined") return "";

  const weightInKilogram = weight / 10;

  return `${weightInKilogram} kg`;
};
