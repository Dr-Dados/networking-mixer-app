
const Buttons = ({ createGroups, downloadLog, clearLog, toggleLog }) => (
  <div className="mt-6 space-x-4">
    <button
      onClick={createGroups}
      className="bg-green-500 text-white px-4 py-2 rounded-lg"
    >
      Create Groups
    </button>
    <button
      onClick={downloadLog}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      Download Log
    </button>
    <button
      onClick={clearLog}
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      Clear Log
    </button>
    <button
      onClick={toggleLog}
      className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
    >
      Show Log
    </button>
  </div>
);

export default Buttons;
