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
          id="startNetworking"
          className="px-12 py-4 text-lg font-bold text-white transition transform rounded-full shadow-lg bg-gradient-to-r from-green-400 to-teal-500 hover:scale-105"
          onClick={handleStartNetworking}
        >
          Start Networking
        </button>
      ) : (
        <>
          <button
            id="stopNetworking"
            className="px-8 py-3 text-lg font-bold text-white transition transform bg-red-500 rounded-full shadow-lg hover:bg-red-600 hover:scale-105"
            onClick={handleStopNetworking}
          >
            Stop Networking
          </button>
          <button
            className="px-8 py-3 text-lg font-bold text-white transition transform bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 hover:scale-105"
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
