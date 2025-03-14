export const computeHighestProbabilityCountry = (countries) => {
  if (!countries || countries.length === 0) return null;

  return countries.reduce((max, item) =>
    item.probability > max.probability ? item : max
  );
};
