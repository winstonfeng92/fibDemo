// Function that takes an array of fibonacci objects and returns n more.
function fibonacciSequence(arrayData, n) {
  const result = [...arrayData];

  // Perform Fibonacci sequence 'n' times
  for (let i = 2; i < n; i++) {
    const nextNumber = result[i - 1].number + result[i - 2].number;
    result.push({ id: i + 1, number: nextNumber });
  }

  return result;
}

const arrayData = [
  { id: 1, number: 0 },
  { id: 2, number: 1 },
];

console.log(fibonacciSequence(arrayData, 20));

module.exports = { fibonacciSequence };
