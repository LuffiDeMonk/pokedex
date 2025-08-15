export const formatPokemonCaptureRate = (genderRate: number | undefined) => {
  let captureRatePercentage;
  if (typeof genderRate === "undefined") return (captureRatePercentage = "");
  captureRatePercentage = ((genderRate / (3 * 255)) * 100).toFixed(1);
  captureRatePercentage = captureRatePercentage + "% PokéBall & Full HP";
  return captureRatePercentage;
};
