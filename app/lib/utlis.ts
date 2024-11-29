export const getMinAllowedBdate = () => {
  return new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    .toISOString()
    .split("T")[0];
};
