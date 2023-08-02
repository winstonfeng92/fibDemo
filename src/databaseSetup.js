const mysql = require("mysql2/promise");

const connectionConfig = {
  host: "localhost",
  user: "root",
  password: "test",
  database: "fib",
};

async function createTablesAndPopulateFibonacci() {
  try {
    const connection = await mysql.createConnection(connectionConfig);

    // Create the database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${connectionConfig.database}`
    );
    await connection.query(`USE ${connectionConfig.database}`);

    // Create the "fibonacci_sequence" table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS fibonacci_sequence (
        id INT AUTO_INCREMENT PRIMARY KEY,
        number BIGINT NOT NULL
      )
    `);

    // Create the "max_fibonacci_number" table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS max_fibonacci_number (
        id INT PRIMARY KEY,
        number BIGINT NOT NULL
      )
    `);

    console.log(
      'Tables "fibonacci_sequence" and "max_fibonacci_number" created or already exist.'
    );

    // Check if the "fibonacci_sequence" table is empty
    const [rows] = await connection.query(
      "SELECT COUNT(*) AS count FROM fibonacci_sequence"
    );
    const rowCount = rows[0].count;

    // If the "fibonacci_sequence" table is empty, insert the first two numbers (0 and 1) into it
    if (rowCount === 0) {
      await connection.query(`
        INSERT INTO fibonacci_sequence (number) VALUES (0), (1)
      `);
      console.log(
        'The "fibonacci_sequence" table has been populated with the first two Fibonacci numbers (0 and 1).'
      );
    }

    // Check if the "max_fibonacci_number" table is empty
    const [maxRows] = await connection.query(
      "SELECT COUNT(*) AS count FROM max_fibonacci_number"
    );
    const maxRowCount = maxRows[0].count;

    // Insert the initial row if "max_fibonacci_number" table is empty
    if (maxRowCount === 0) {
      await connection.query(`
        INSERT INTO max_fibonacci_number (id, number) VALUES (1, 1)
      `);
      console.log(
        'The "max_fibonacci_number" table has been populated with the initial row (id: 1, number: 1).'
      );
    }

    // Close the connection
    await connection.end();
  } catch (error) {
    console.error("Error creating tables and populating Fibonacci:", error);
  }
}

module.exports = {
  createTablesAndPopulateFibonacci,
  connectionConfig,
};
