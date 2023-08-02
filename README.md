# Fibonacci Fullstack demo

nodejs api + angular frontend client + mysql db that generates fibonacci sequence and avoids repeat calculations by reading/writing to database

## Setup Instructions

1. Configure file through db configuration (src/databaseSetup.js): must have a mysql database running locally, set parameters for host, user, dbname, password to connect in the file
2. After inputting correct credentials, running node will step through the script to create database and populate the 1st 2 entries of a fib table (0, 1)
3. Client and server should be accessible using npm start. client build is in public folder.

## System Design

- single POST route that submits the nth fib user wants, and returns the fib array
- backend server handles logic of communicating with database or creating more fib numbers to add to the array
- primary logic revolves around getting all fib entries from db table, counting them, seeing if they are enough (if not write more to the table) then return the fib array

Pros of this design:

- Only have to communicate with 1 table with relatively simple methods/query
- Structure of the table allows for no repeat writes or reads for fibs. (If I ask for 5 fibs and I've already written 10 fibs previously, I will return 5 fibs and never need to append to the table)
- Single post query that returns a fibonacci array is easy for the client side to process (I did this in Angular)

Cons:

- dangers/drawbacks of this is the assumption that the db table will have the right fib arrays/entries. This was a con I was willing to accept.
- database performance impact from trying to interface with only 1 table
- needs to be more reliable with error handling

## Possible follow-ups to this design:

- More error handling and error checking (stored procs in db or server methods to double check that we're writing correctly)
- Possible ways to setup database for ideal read/write/logic protection?
- Create a seperate table to store max_fib number calculated so we don't have to tax the same table too many times.
- Certain limits to using int or bigInt, might want to think about expanding the ceiling
- (retrospectively, a single get request/endpoint would be even easier for the frontend)
  -fully deploy this online
