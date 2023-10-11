import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.get("/", (req,res) => {
    res.send("./index.html");
});

app.listen(port, () => {
    console.log("Server started on port:" + port);
})