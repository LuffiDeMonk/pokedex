export const formatExperiencePoints = (growthRate: string | undefined) => {
  switch (growthRate) {
    case "slow":
      return "1250000";
    case "medium":
      return "1000000";
    case "fast":
      return "800000";
    case "medium-slow":
      return "1059860";
    case "slow-then-very-fast":
      return "600000";
    case "fast-then-very-slow":
      return "1640000";
    default:
      return "";
  }
};
