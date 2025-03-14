import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [debouceValue, setDeboucedValue] = useState("");
  const [results, setResults] = useState("");
  const [nationality, setNationality] = useState("");

  const countryCode = results?.country?.reduce(
    (max, item) => (item.probability > max.probability ? item : max),
    results.country[0].country_id
  );

  useEffect(() => {
    const getNationality = async () => {
      if (debouceValue) {
        const response = await fetch(
          `https://api.nationalize.io/?name=${debouceValue}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        setResults(data);

        setNationality(countryCode);
      }
    };

    getNationality();
  }, [countryCode, debouceValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDeboucedValue(query);
    }, [300]);

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
