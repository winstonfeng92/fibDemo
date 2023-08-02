// function that takes an array of fibonacci objects and returns n more.
function fibonacciSequence(arrayData, n) {
  const result = [...arrayData];
  const final = [];

  // push additional n fibs to final array and return
  for (let i = arrayData.length; i < arrayData.length + n; i++) {
    const nextNumber = result[i - 1].number + result[i - 2].number;
    result.push({ id: i + 1, number: nextNumber });
    final.push({ id: i + 1, number: nextNumber });
  }

  return final;
}

//Testing Area
// const arrayData = [
//   { id: 1, number: 0 },
//   { id: 2, number: 1 },
// ];

// console.log(fibonacciSequence(arrayData, 5));

module.exports = { fibonacciSequence };
