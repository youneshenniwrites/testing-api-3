const NationalityResult = ({ nationality }) => {
  return (
    <div>
      <p className="text-bold text-center text-2xl">
        You are likely from: {nationality}
      </p>
    </div>
  );
};

export default NationalityResult;
