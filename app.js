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

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunkSize = 2;

console.log(divideArray(array, chunkSize));
