import { useState, useEffect } from "react";
import { fetchNationality } from "../api/nationalize";
import { computeHighestProbabilityCountry } from "../utils/computeHighestProbabilityCountry";

const useFetchNationality = (debounceValue) => {
  const [nationality, setNationality] = useState("");

  useEffect(() => {
    const getNationality = async () => {
      if (!debounceValue) return;

      try {
        const data = await fetchNationality(debounceValue);
        const highestProbabilityCountry = computeHighestProbabilityCountry(
          data?.country
        );

        setNationality(highestProbabilityCountry?.country_id || "Unknown");
      } catch (error) {
        console.error("Error fetching nationality:", error);
        setNationality("Error fetching nationality");
      }
    };

    getNationality();
  }, [debounceValue]);

  return nationality;
};

export default useFetchNationality;
