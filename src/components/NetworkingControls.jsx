const NetworkingControls = ({
  isTimerRunning,
  handleStartNetworking,
  handleStopNetworking,
  handleShuffleGroups,
}) => {
  return (
    <div className="flex justify-center space-x-4">
      {!isTimerRunning ? (
        <button
          className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-12 py-4 rounded-full text-lg font-bold shadow-lg hover:scale-105 transform transition"
          onClick={handleStartNetworking}
        >
          Start Networking
        </button>
      ) : (
        <>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition transform hover:scale-105"
            onClick={handleStopNetworking}
          >
            Stop Networking
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition transform hover:scale-105"
            onClick={handleShuffleGroups}
          >
            Shuffle Groups
          </button>
        </>
      )}
    </div>
  );
};

export default NetworkingControls;
