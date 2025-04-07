import { NATIONALIZE_API_BASE_URL as BASE_URL } from "../constants/urls";

export const fetchNationality = async (name) => {
  if (!name) return null;

  const response = await fetch(`${BASE_URL}/?name=${name}`);
  if (!response.ok) {
    throw new Error("Failed to fetch nationality data");
  }

  const data = await response.json();
  return data;
};
