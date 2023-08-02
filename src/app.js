const express = require("express");
const cors = require("cors");
const fibRoutes = require("./fibRoutes");
const { createTablesAndPopulateFibonacci } = require("./databaseSetup");
const path = require("path");

//create and setup database in mySQL
createTablesAndPopulateFibonacci();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/api/fibonacci", fibRoutes);
app.use(express.static(path.join(__dirname, "../public")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
