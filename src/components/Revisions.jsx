import React, { useEffect, useState } from "react";

export default function Revisions() {
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce(query, 300);
  const { users, loading, error } = useFetchUsers();

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(debouncedValue.toLowerCase())
  );

  if (loading) return <p>Loading ....</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filteredUsers.map((user) => (
        <p>{user?.name}</p>
      ))}
    </div>
  );
}

// hook 1
const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const response = await fetch("https://api.whatever.com/");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data.results);
      };

      fetchUsers();
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { users, loading, error };
};

// hook 2
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
