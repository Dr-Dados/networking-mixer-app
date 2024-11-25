const Controls = ({
  groupSize,
  maxStudentsPerGroup,
  timerInput,
  setGroupSize,
  setMaxStudentsPerGroup,
  setTimerInput,
}) => (
  <div className="flex justify-around mb-6">
    <div className="w-1/4">
      <label>Group Size</label>
      <input
        type="number"
        value={groupSize}
        onChange={(e) => setGroupSize(Number(e.target.value))}
        className="border p-2 rounded-lg w-full mt-2"
      />
    </div>
    <div className="w-1/4">
      <label>Max Students Per Group</label>
      <input
        type="number"
        value={maxStudentsPerGroup}
        onChange={(e) => setMaxStudentsPerGroup(Number(e.target.value))}
        className="border p-2 rounded-lg w-full mt-2"
      />
    </div>
    <div className="w-1/4">
      <label>Change Groups Every (minutes)</label>
      <input
        type="time"
        value={timerInput}
        onChange={(e) => setTimerInput(e.target.value)}
        className="border p-2 rounded-lg w-full mt-2"
      />
    </div>
  </div>
);

export default Controls;
