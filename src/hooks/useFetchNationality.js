import { useState, useEffect } from "react";
import { computeHighestProbabilityCountry } from "../utils/ computeHighestProbabilityCountry";

const useFetchNationality = (debounceValue) => {
  const [nationality, setNationality] = useState("");

  useEffect(() => {
    const getNationality = async () => {
      if (!debounceValue) return;

      try {
        const response = await fetch(
          `https://api.nationalize.io/?name=${debounceValue}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
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
