import { useState } from "react";
import "./App.css";
import useFetchNationality from "./hooks/useFetchNationality";
import useDebounce from "./hooks/useDebounce";
import NationalityInput from "./components/NationalityInput";
import NationalityResult from "./components/NationalityResult";

function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { nationality, loading, error } = useFetchNationality(debouncedQuery);

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <NationalityInput
        query={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {nationality && (
        <NationalityResult
          nationality={nationality}
          className="border p-4 rounded-lg bg-white shadow-lg"
        />
      )}
    </div>
  );
}

export default App;
