const express = require("express");
const router = require("./routes");
require("express-async-errors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);
//middleware error handler express
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
