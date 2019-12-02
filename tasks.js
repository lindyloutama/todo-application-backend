const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(cors());
// allows Express to parse JSON ddata that is sent on the body of any requests
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "todos"
});

app.get("/tasks", function (request, response){
  connection.query("SELECT * FROM Task", function(err, data) {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.status(200).json({
        tasks: data
      });
    }
  });
});

app.post("/tasks", function(req, res) {
  const text = req.body.text;
  const date = req.body.date;
  const completed = req.body.completed;
  const userId = req.body.completeduserId;

  res.json({
    message: `Received a request to add task ${text} with date ${date}`
  });

app.delete("/tasks/:taskId", function(req, res) {
    const id = req.params.taskId;

    res.json({
    message: "request granted"
    });
 });
});

module.exports.tasks = serverless(app);