import { useState, useEffect } from "react";
import { fetchNationality } from "../api/nationalityService";
import { computeHighestProbabilityCountry } from "../utils/computeHighestProbabilityCountry";

const useFetchNationality = (debounceValue) => {
  const [nationality, setNationality] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNationality = async () => {
      if (!debounceValue) {
        setNationality("");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchNationality(debounceValue);
        const highest = computeHighestProbabilityCountry(data?.country);
        setNationality(highest?.country_id || "Unknown");
      } catch (err) {
        console.error("Error fetching nationality:", err);
        setError("Something went wrong.");
        setNationality("");
      } finally {
        setLoading(false);
      }
    };

    getNationality();
  }, [debounceValue]);

  return { nationality, loading, error };
};

export default useFetchNationality;
