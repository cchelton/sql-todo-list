const express = require("express");
const bodyParser = require("body-parser");
const tasksRouter = require("./routes/tasks.router");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

//ROUTES
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
