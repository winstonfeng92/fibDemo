const express = require("express");
const router = express.Router();
const { getFirstNValues, writeMultipleLines } = require("./databaseUtils");
const { fibonacciSequence } = require("./fibUtility");

//Single post route is needed to post a desired fibonacci N, and then work with
//db utility to create more fibs if any are needed.

// route to handle POST request to /api/fibonacci
router.post("/", async (req, res) => {
  try {
    const { n } = req.body;
    const parsedN = parseInt(n, 10);

    // db call for n values from "fibonacci_sequence" table
    const firstNValues = await getFirstNValues("fibonacci_sequence", parsedN);
    let numberArray = firstNValues.map((item) => item.number);
    //   if first n values are not enough,  calculate more, return the n values, and write to db
    if (firstNValues.length < n) {
      const additionalFibs = n - firstNValues.length;
      const addedFibs = fibonacciSequence(firstNValues, additionalFibs);
      const result = [...firstNValues, ...addedFibs];
      //adding the additional lines to the fibonacci db
      await writeMultipleLines("fibonacci_sequence", addedFibs);

      res.json(result);
    } else res.json(firstNValues);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//curl -X POST -H "Content-Type: application/json" -d '{"n": 10}' http://localhost:3001/api/fibonacci

module.exports = router;
