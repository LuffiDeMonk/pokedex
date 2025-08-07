export const getPokemonImage = ({pokemonId}:{pokemonId:string}) => {
    return `${import.meta.env.VITE_POKEMON_BASE_IMAGE_URL}/${pokemonId}.png`;
}