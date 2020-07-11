const express = require("express");
const app = express();
const routers = require("./server/routers");
const path = require('path');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/shoppingcenter", {useNewUrlParser: true});

app.use(express.static(__dirname + "/public/"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024}
}))

routers(app);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(3000, () => console.log("Server started in port 3800"));