const express = require("express");
const app = express();
const fs = require("fs");

// constants
const DB_PATH = "https://api.jsonbin.io/v3/b/63479f600e6a79321e26bb2b?meta=false";
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());

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
      imgLink: body.imgLink
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