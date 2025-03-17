import React, { useEffect, useState } from "react";

export default function Revisions() {
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const response = await fetch("https://api.whatever.com/");
        if (!response.ok) throw Error("Failed to fetch users");
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

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
