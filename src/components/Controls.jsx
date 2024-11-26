const Controls = ({
  groupSize,
  maxStudentsPerGroup,
  timerInput,
  setGroupSize,
  setMaxStudentsPerGroup,
  setTimerInput,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition text-center">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Group Size
      </label>
      <input
        type="number"
        value={groupSize}
        onChange={(e) => setGroupSize(+e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300 focus:outline-none"
      />
    </div>
    <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition text-center">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Max Students Per Group
      </label>
      <input
        type="number"
        value={maxStudentsPerGroup}
        onChange={(e) => setMaxStudentsPerGroup(+e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-300 focus:outline-none"
      />
    </div>
    <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition text-center">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Timer Duration (mm:ss)
      </label>
      <input
        type="time"
        value={timerInput}
        onChange={(e) => setTimerInput(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-red-300 focus:outline-none"
      />
    </div>
  </div>
);

export default Controls;
