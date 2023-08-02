const mysql = require("mysql2/promise");

const { connectionConfig } = require("./databaseSetup");

async function getCountOfRows(tableName) {
  try {
    const connection = await mysql.createConnection(connectionConfig);

    const [rows] = await connection.query(
      `SELECT COUNT(*) AS count FROM ${tableName}`
    );
    const rowCount = rows[0].count;

    // Close the connection
    await connection.end();

    return rowCount;
  } catch (error) {
    console.error("Error getting row count:", error);
    throw error;
  }
}

async function getValueById(tableName, id) {
  try {
    const connection = await mysql.createConnection(connectionConfig);

    const [rows] = await connection.query(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );
    const value = rows[0];

    // Close the connection
    await connection.end();

    return value;
  } catch (error) {
    console.error("Error getting value by ID:", error);
    throw error;
  }
}

async function writeMultipleLines(tableName, data) {
  try {
    const connection = await mysql.createConnection(connectionConfig);

    const placeholders = data.map(() => "(?, ?)").join(", ");
    const values = data.flatMap(({ id, number }) => [id, number]);

    await connection.query(
      `INSERT INTO ${tableName} (id, number) VALUES ${placeholders}`,
      values
    );

    // Close the connection
    await connection.end();

    console.log(`Inserted ${data.length} rows into the ${tableName} table.`);
  } catch (error) {
    console.error("Error writing multiple lines to the database:", error);
    throw error;
  }
}

async function getFirstNValues(tableName, n) {
  try {
    const connection = await mysql.createConnection(connectionConfig);

    const [rows] = await connection.query(
      `SELECT * FROM ${tableName} ORDER BY id LIMIT ?`,
      [n]
    );

    // Close the connection
    await connection.end();

    return rows;
  } catch (error) {
    console.error("Error getting first N values:", error);
    throw error;
  }
}

module.exports = {
  getCountOfRows,
  getValueById,
  writeMultipleLines,
  getFirstNValues,
};
