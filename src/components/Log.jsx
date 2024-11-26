const Log = ({ logEntries }) => {
  return (
    <div className="bg-white p-6 mt-6 shadow-lg rounded-lg">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Log Entries</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
              >
                Group
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
              >
                Members
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
              >
                Change Groups Every
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logEntries.map((entry, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 transition-colors duration-150"
              >
                {logEntries.length <= 0 ? (
                  <td>No logs to show</td>
                ) : (
                  <>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {entry.time}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      Group {idx + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {entry.members.map((member, memberIdx) => (
                        <span
                          key={memberIdx}
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-lg ${
                            member.role === "student"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          } mr-1`}
                        >
                          {member.name}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {entry.timer}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Log;
