export interface formattedPokemonEvolutionData {
  id: string;
  name: string;
  min_level: number;
}
export enum PokemonType {
  Grass = "grass",
  Poison = "poison",
  Fire = "fire",
  Flying = "flying",
  Water = "water",
  Bug = "bug",
  Normal = "normal",
  Electric = "electric",
  Ground = "ground",
  Fighting = "fighting",
  Psychic = "psychic",
  Rock = "rock",
  Fairy = "fairy",
  Steel = "steel",
  Ice = "ice",
  Ghost = "ghost",
  Dragon = "dragon",
  Dark = "dark",
}
export type PokemonVariant = `${PokemonType}` | "default";
