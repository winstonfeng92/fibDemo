const express = require("express");
const router = express.Router();
const { getFirstNValues } = require("./databaseUtils");

// Route to handle POST request to /api/fibonacci
router.post("/", async (req, res) => {
  try {
    // Get the value of 'n' from the request body
    const { n } = req.body;

    // Get the first 'n' values from the "fibonacci_sequence" table
    const firstNValues = await getFirstNValues("fibonacci_sequence", parsedN);
    console.log("endpoint");
    let numberArray = firstNValues.map((item) => item.number);
    console.log(numberArray);
    // Send the first 'n' values as a response
    res.json(firstNValues);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
