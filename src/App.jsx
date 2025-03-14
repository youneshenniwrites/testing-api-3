import { useState } from "react";
import "./App.css";
import useFetchNationality from "./hooks/useFetchNationality";
import useDebounce from "./hooks/useDebounce";
import NationalityInput from "./components/NationalityInput";
import NationalityResult from "./components/NationalityResult";

function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const nationality = useFetchNationality(debouncedQuery);

  return (
    <div>
      <NationalityInput
        query={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <NationalityResult nationality={nationality} />
    </div>
  );
}

export default App;
