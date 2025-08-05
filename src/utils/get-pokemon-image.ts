export const getPokemonImage = ({pokemonId}:{pokemonId:number}) => {
    return `${import.meta.env.VITE_POKEMON_BASE_IMAGE_URL}/${pokemonId}.png`;
}