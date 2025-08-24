import { ICON_MAP } from "../constant/icon-map";

export const getAbilityIcon = (abilityName: string) => {
  return ICON_MAP[abilityName as keyof typeof ICON_MAP] ?? "sparkles";
};
