const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");

app.listen(3000, () => console.log("running 3000"));
app.use(cors());

app.use(express.static("dist"));

app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 2000 * Math.random());
});

// 获取用户数据
app.use("/screen/data", (req, res) => {
  let filePath = path.resolve(__dirname, "./data/screen-data.json");
  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.json({
        message: "大屏用户数据出错了",
        data: err,
        code: 5000,
      });
      return;
    }
    // console.log(String(data));
    res.json({
      message: "大屏用户数据",
      data: JSON.parse(String(data)),
      code: 200,
    });
  });
});

// 获取地图数据
app.use("/screen/map", (req, res) => {
  let filePath = path.resolve(__dirname, "./data/screen-map.json");
  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.json({
        message: "出错了",
        data: err,
        code: 5000,
      });
      return;
    }
    // console.log(data);
    // console.log(String(data));
    res.json({
      message: "大屏用户数据",
      data: JSON.parse(String(data)),
    });
  });
});
