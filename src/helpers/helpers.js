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

export {
  shuffleArray,
  convertTimerToSeconds,
  divideArray,
  generateArrayWithRole,
};
