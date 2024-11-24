
const Countdown = ({ timeRemaining }) => (
  <div className="text-4xl font-bold text-red-600 mt-6">
    Next Group Change in:{" "}
    {String(Math.floor(timeRemaining / 60)).padStart(2, "0")}:
    {String(timeRemaining % 60).padStart(2, "0")}
  </div>
);

export default Countdown;
