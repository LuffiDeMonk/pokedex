export const formatPokemonStatusTitle = (title: string) => {
  switch (title) {
    case 'special-attack':
      return 'Sp. Attack';
    case 'special-defense':
      return 'Sp. Defense';
    case 'hp':
      return 'HP';
    default:
      return title;
  }
};
