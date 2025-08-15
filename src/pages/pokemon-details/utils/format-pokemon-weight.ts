export const formatPokemonWeight = (weight: number | undefined) => {
  if (typeof weight === "undefined") return "";

  const weightInKilogram = weight / 10;
  const weightInPounds = weightInKilogram * 2.20462;

  return `${weightInKilogram} kg (${weightInPounds.toFixed(2)} lbs.)`;
};
