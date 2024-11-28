const Controls = ({
  groupSize,
  maxStudentsPerGroup,
  timerInput,
  setGroupSize,
  setMaxStudentsPerGroup,
  setTimerInput,
  setConstantTimer,
  isActive,
}) => {
  function onChangeTimeHandler(e) {
    setConstantTimer(e.target.value);
    setTimerInput(e.target.value);
  }
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="p-6 text-center transition shadow-md bg-gray-50 rounded-xl hover:shadow-lg">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Group Size
        </label>
        <input
          type="number"
          value={groupSize}
          onChange={(e) => setGroupSize(+e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300 focus:outline-none"
          disabled={isActive}
        />
      </div>
      <div className="p-6 text-center transition shadow-md bg-gray-50 rounded-xl hover:shadow-lg">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Max Students Per Group
        </label>
        <input
          type="number"
          value={maxStudentsPerGroup}
          onChange={(e) => setMaxStudentsPerGroup(+e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-300 focus:outline-none"
          disabled={isActive}
        />
      </div>
      <div className="p-6 text-center transition shadow-md bg-gray-50 rounded-xl hover:shadow-lg">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Timer Duration (mm:ss)
        </label>
        <input
          type="text"
          value={timerInput}
          onChange={onChangeTimeHandler}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
          maxLength={5} // Restrict input to "mm:ss" format
          pattern="\d{2}:\d{2}" // Ensure valid format (regex for mm:ss)
          disabled={isActive}
        />
      </div>
    </div>
  );
};

export default Controls;
