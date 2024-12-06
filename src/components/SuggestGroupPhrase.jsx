const SuggestGroupPhrase = ({ groupSize, professionals, students }) => {
  const totalStudents = students.length;
  const totalProfessionals = professionals.length;
  const totalPeople = totalStudents + totalProfessionals;

  // Calculate number of groups (rounded up to ensure all people are included)
  const numberOfGroups = Math.ceil(totalPeople / groupSize);

  // Calculate the adjusted group size to distribute evenly
  const approximateGroupSize = Math.ceil(totalPeople / numberOfGroups);

  // Calculate the number of students and professionals per group
  const studentsPerGroup = Math.floor(totalStudents / numberOfGroups);
  const professionalsPerGroup = Math.floor(totalProfessionals / numberOfGroups);

  // Calculate remaining students and professionals after even distribution
  const studentsRemaining = totalStudents % numberOfGroups;
  const professionalsRemaining = totalProfessionals % numberOfGroups;

  // Helper to render the main message
  const renderMessage = (message, gradient) => (
    <div
      className={`max-w-md p-6 mx-auto mt-8 text-center rounded-lg shadow-lg ${gradient}`}
    >
      <p className="text-lg text-gray-700">{message}</p>
    </div>
  );

  // Main message when both professionals and students are present
  if (totalProfessionals > 0 && totalStudents > 0) {
    return (
      <div className="max-w-md p-6 mx-auto mt-8 text-center rounded-lg shadow-lg bg-gradient-to-br from-gray-50 to-indigo-100">
        <h3 className="mb-4 text-xl font-semibold text-indigo-700">
          Group Formation Suggestion
        </h3>
        <p className="text-lg text-gray-700">
          {`With ${totalStudents} students and ${totalProfessionals} professionals, you can create ${numberOfGroups} groups of approximately ${approximateGroupSize} people each. Each group will ideally consist of ${studentsPerGroup} students and ${professionalsPerGroup} professionals.`}
        </p>
        {(studentsRemaining > 0 || professionalsRemaining > 0) && (
          <p className="mt-4 text-gray-700">
            {`There will be ${studentsRemaining} additional student${
              studentsRemaining > 1 ? "s" : ""
            } and ${professionalsRemaining} additional professional${
              professionalsRemaining > 1 ? "s" : ""
            } to distribute among the groups.`}
          </p>
        )}
      </div>
    );
  }

  // Fallback messages
  if (totalProfessionals === 0 && totalStudents === 0) {
    return renderMessage(
      "No professionals or students are available to form groups.",
      "bg-gradient-to-br from-gray-50 to-red-100"
    );
  }

  if (totalProfessionals === 0) {
    return renderMessage(
      "Only students are available. Add professionals to form balanced groups.",
      "bg-gradient-to-br from-gray-50 to-orange-100"
    );
  }

  if (totalStudents === 0) {
    return renderMessage(
      "Only professionals are available. Add students to form balanced groups.",
      "bg-gradient-to-br from-gray-50 to-blue-100"
    );
  }

  return null;
};

export default SuggestGroupPhrase;
