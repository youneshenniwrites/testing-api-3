export const fetchNationality = async (name) => {
  if (!name) return null;

  const response = await fetch(`https://api.nationalize.io/?name=${name}`);
  if (!response.ok) {
    throw new Error("Failed to fetch nationality data");
  }

  const data = await response.json();
  return data;
};
