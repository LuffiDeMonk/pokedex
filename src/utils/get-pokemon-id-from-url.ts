export const getPokemonIdFromUrl = (url?: string) => {
  return url?.split("/").at(-2) ?? '';
};
