const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");

// constants
const DB_PATH = path.resolve("db.json");
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);
// routes
app.get("/", async (req, res) => {
  fs.readFile(DB_PATH, "utf-8", (err, jsonString) => {
    if (err) return console.log("Error in reading from db");
    let values = JSON.parse(jsonString);
    res.status(200).json({
      totalValues: values.length,
      values,
    });
  });
});

app.post("/", async (req, res) => {
  fs.readFile(DB_PATH, "utf-8", (err, jsonString) => {
    if (err) return console.log("Error in reading from db");
    let body = req.body;
    let valuesArr = JSON.parse(jsonString);
    let obj = {
      price: body.price,
      itemname: body.itemname,
      timestamp: new Date(),
    };
    valuesArr.push(obj);
    console.log(obj);
    fs.writeFile(DB_PATH, JSON.stringify(valuesArr), (err) => {
      if (err) return console.log("Error in updating db");
      res.status(200).json({
        message: "Values saved",
        value: valuesArr[valuesArr.length - 1],
      });
    });
  });
});

app.listen(PORT, () => console.log("Port Started on http://localhost:" + PORT + " 🔥"));
