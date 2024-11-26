const GroupsDisplay = ({ groups }) => {
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Current Groups
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-gray-100 rounded-lg shadow-lg p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-700">{group.id}</h3>
            <p className="text-sm text-gray-500">Created at: {group.time}</p>
            <ul className="space-y-2">
              {group.members.map((member, idx) => (
                <li
                  key={idx}
                  className={`text-sm font-medium ${
                    member.role === "student"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {member.name} ({member.role})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsDisplay;
