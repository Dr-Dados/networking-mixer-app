import { useState, useEffect } from "react";

const Countdown = ({ initialTimer, constantTimer }) => {
  const [timer, setTimer] = useState(initialTimer);
  const [isPaused, setIsPaused] = useState(true);

  // Convert mm:ss to total seconds
  const convertToSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  // Convert total seconds back to mm:ss format
  const convertToMMSS = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    let totalSeconds = convertToSeconds(timer);

    const interval = setInterval(() => {
      if (!isPaused) {
        totalSeconds -= 1;
        if (totalSeconds <= 0) {
          totalSeconds = convertToSeconds(constantTimer); // Reset when timer reaches 0
        }
        setTimer(convertToMMSS(totalSeconds));
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [constantTimer, isPaused, timer]);

  // Handle Reset
  const handleReset = () => {
    setTimer(initialTimer);
    setIsPaused(true); // Automatically pause when reset
  };

  // Toggle Pause/Resume
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="text-center space-y-6">
      <div className="inline-block bg-gradient-to-r from-red-500 to-orange-400 text-white text-3xl font-bold rounded-full px-8 py-4 shadow-lg">
        Next Group Change In: {timer}
      </div>
      <p className="text-sm text-gray-500">
        Groups will automatically refresh every {constantTimer}.
      </p>
      <div className="space-x-4">
        <button
          onClick={togglePause}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition duration-200"
        >
          {isPaused ? "Resume Timer" : "Pause Timer"}
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition duration-200"
        >
          Reset Timer
        </button>
      </div>
    </div>
  );
};

export default Countdown;
