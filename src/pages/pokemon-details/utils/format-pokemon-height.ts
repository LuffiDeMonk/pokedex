export const formatPokemonHeight = (height: number | undefined) => {
    if(typeof height === 'undefined') return ''
    const heightInMeters = height / 10
    return `${heightInMeters.toFixed(2)} m`
}