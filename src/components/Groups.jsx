
const Groups = ({ groups }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {groups.map((group, index) => (
      <div key={index} className="bg-gray-200 p-4 rounded-lg">
        <h3 className="font-bold">Group {index + 1}</h3>
        <p>
          {group.map((member, idx) => (
            <span
              key={idx}
              className={
                member.type === "student" ? "text-green-600" : "text-blue-600"
              }
            >
              {member.name}
            </span>
          ))}
        </p>
      </div>
    ))}
  </div>
);

export default Groups;
