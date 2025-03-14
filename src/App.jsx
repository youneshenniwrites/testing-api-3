import { useEffect, useState } from "react";
import "./App.css";

const getHighestProbabilityCountry = (countries) => {
  if (!countries || countries.length === 0) return null;

  return countries.reduce((max, item) =>
    item.probability > max.probability ? item : max
  );
};

function App() {
  const [query, setQuery] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
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

        const highestProbabilityCountry = getHighestProbabilityCountry(
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="text-xl">
      <input
        type="text"
        placeholder="Search your name ...."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="m-6 bg-amber-700 p-6 border-4"
      />
      <div>
        <p className="text-bold text-2xl">You are likely from: {nationality}</p>
      </div>
    </div>
  );
}

export default App;
