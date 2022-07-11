const express = require("express");
const app = express();
const path = require("path");

const distDirPath = path.resolve("./");
app.use(express.static(distDirPath+"/build"));

app.get("/*", (req, res) => {
    res.sendFile(distDirPath + "/build/index.html");
});

app.listen(3000, (req, res) => {
    console.log("Server has started on port 3000.");
});