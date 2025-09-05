export const calculateDuration = (duration: number) => {
  return `${Math.floor(duration / 3600)} hours ${Math.floor(
    (duration % 3600) / 60
  )} minutes`;
};
