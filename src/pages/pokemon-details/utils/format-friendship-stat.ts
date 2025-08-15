export const formatFriendshipStat = (friendship: number | undefined) => {
  if (!friendship) return "";
  switch (true) {
    case friendship > 100:
      return " High";
    case friendship > 70:
      return " Higher than Normal";
    case friendship === 70:
      return "Normal";
    case friendship >= 35:
      return "Lower than Normal";
    default:
      return "Low";
  }
};
