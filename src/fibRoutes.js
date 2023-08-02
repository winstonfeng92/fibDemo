const express = require("express");
const router = express.Router();
const { getFirstNValues } = require("./databaseUtils");
const { fibonacciSequence } = require("./fibUtility");

//Single post route is needed to post a desired fibonacci N, and then work with
//db utility to create more fibs if any are needed.

// Route to handle POST request to /api/fibonacci
router.post("/", async (req, res) => {
  try {
    // Get the value of 'n' from the request body
    const { n } = req.body;
    const parsedN = parseInt(n, 10);

    // Get the first 'n' values from the "fibonacci_sequence" table
    const firstNValues = await getFirstNValues("fibonacci_sequence", parsedN);

    console.log("endpoint");
    let numberArray = firstNValues.map((item) => item.number);
    console.log(numberArray);
    // Send the first 'n' values as a response
    if (firstNValues.length < n) {
      const additionalFibs = n - firstNValues.length;
      console.log("additions Fibs needed: ", additionalFibs);
      console.log(firstNValues);
      const addedFibs = fibonacciSequence(firstNValues, additionalFibs);
      console.log(addedFibs);
      const result = [...firstNValues, ...addedFibs];
      res.json(result);
      //   res.json([...firstNValues, ...addedFibs]);
    } else res.json(firstNValues);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//curl -X POST -H "Content-Type: application/json" -d '{"n": 10}' http://localhost:3001/api/fibonacci

module.exports = router;
