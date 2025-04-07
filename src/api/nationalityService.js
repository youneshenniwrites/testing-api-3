import { API_BASE_URLS } from "../constants/urls";

export const fetchNationality = async (name) => {
  if (!name) return null;

  const response = await fetch(`${API_BASE_URLS.NATIONALIZE}/?name=${name}`);
  if (!response.ok) {
    throw new Error("Failed to fetch nationality data");
  }

  const data = await response.json();
  return data;
};
