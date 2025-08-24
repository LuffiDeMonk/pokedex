export const formatPokemonStatusTitle = (title: string) => {
  switch (title) {
    case 'special-attack':
      return "Special Attack";
    case 'special-defense':
      return "Special Defense";
    case 'hp':
      return 'HP';
    default:
      return title;
  }
};
