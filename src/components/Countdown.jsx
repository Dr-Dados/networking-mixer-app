
const Countdown = ({ timer }) => {
  return (
    <div className="text-center">
      <div className="inline-block bg-gradient-to-r from-red-500 to-orange-400 text-white text-3xl font-bold rounded-full px-8 py-4 shadow-lg">
        Next Group Change In: {timer}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Groups will automatically refresh every {timer}.
      </p>
    </div>
  );
};

export default Countdown;
