const students = [
  { name: "Alice", role: "student" },
  { name: "Charlie", role: "student" },
  { name: "Eve", role: "student" },
  { name: "Grace", role: "student" },
  { name: "Ivan", role: "student" },
];

const professionals = [
  { name: "Bob", role: "professional" },
  { name: "David", role: "professional" },
  { name: "Frank", role: "professional" },
  { name: "Heidi", role: "professional" },
  { name: "Judy", role: "professional" },
  { name: "Karl", role: "professional" },
  { name: "Nathan", role: "professional" },
  { name: "Paul", role: "professional" },
  { name: "Quinn", role: "professional" },
  { name: "Steve", role: "professional" },
];

function createGroups(groupSize, maxStudents) {
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

console.log(createGroups(3, 1));
