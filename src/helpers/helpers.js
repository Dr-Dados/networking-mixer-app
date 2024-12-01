// const shuffleArray = (array) => {
//   const shuffled = [...array];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };

const shuffleArray = (array) =>
  array
    .map((value) => ({ value, sortKey: Math.random() })) // Create an array of objects with random sort keys
    .sort((a, b) => a.sortKey - b.sortKey) // Sort the objects by the random sort key
    .map((obj) => obj.value); // Extract t

const convertTimerToSeconds = (timer) => {
  const [minutes, seconds] = timer.split(":").map(Number);
  return minutes * 60 + seconds;
};

const divideArray = (array, chunkSize) => {
  if (chunkSize <= 0) {
    throw new Error("Chunk size must be greater than 0");
  }

  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const generateArrayWithRole = (names, role) => {
  if (!Array.isArray(names)) {
    throw new Error("First parameter must be an array of names");
  }
  if (role !== "student" && role !== "professional") {
    throw new Error(
      'Second parameter must be either "student" or "professional"'
    );
  }

  return names.map((name) => ({ name, role }));
};

function createGroups(students, professionals, groupSize, maxStudents) {
  if (typeof groupSize !== "number" || groupSize <= 0) {
    console.error("Invalid group size");
    return [];
  }
  if (typeof maxStudents !== "number" || maxStudents < 0) {
    console.error("Invalid max students per group");
    return [];
  }

  const groups = [];
  let currentGroup = [];
  let studentCount = 0;

  // Loop until both arrays are empty
  while (students.length > 0 || professionals.length > 0) {
    // Add students to the group up to maxStudents
    while (
      students.length > 0 &&
      studentCount < maxStudents &&
      currentGroup.length < groupSize
    ) {
      currentGroup.push(students.shift()); // Remove the first student and add to group
      studentCount++;
    }

    // Add professionals to fill the group
    while (professionals.length > 0 && currentGroup.length < groupSize) {
      currentGroup.push(professionals.shift()); // Remove the first professional and add to group
    }

    // If the group is full, finalize it
    if (
      currentGroup.length === groupSize ||
      (students.length === 0 && professionals.length === 0)
    ) {
      groups.push(currentGroup);
      currentGroup = [];
      studentCount = 0; // Reset student count for the next group
    }
  }

  return groups;
}
export {
  shuffleArray,
  convertTimerToSeconds,
  divideArray,
  generateArrayWithRole,
  createGroups,
};
