const NationalityInput = ({ query, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search your name ...."
      value={query}
      onChange={onChange}
      className="m-6 bg-amber-700 p-6 border-4 text-xl"
    />
  );
};

export default NationalityInput;
