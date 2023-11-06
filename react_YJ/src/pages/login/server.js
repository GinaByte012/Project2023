const express = require("express");
const app = express();
// const user_inform = require("./user_inform");

// app.use("/user_inform", user_inform);

const port = 60001;
app.listen(port, () =>
  console.log(`Node.js Server is running on port ${port}...`)
);
