
const Log = ({ logEntries }) => (
  <div className="bg-gray-100 p-4 mt-6 rounded-lg">
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th>Time</th>
          <th>Group</th>
          <th>Members</th>
          <th>Change Groups Every</th>
        </tr>
      </thead>
      <tbody>
        {logEntries.map((entry, idx) => (
          <tr key={idx}>
            <td>{entry.time}</td>
            <td>Group {entry.groupNumber}</td>
            <td>{entry.members.map((member) => member.name).join(", ")}</td>
            <td>{entry.timer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Log;
