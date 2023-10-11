import express from "express";
import body from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(body.urlencoded({extended: true}));

var data = {
    year: 2023,
    bandAdj: "",
    bandNoun: "",
  }



app.get("/", (req,res) => {
    // res.sendFile(__dirname + "/public/index.html");
    res.render("index.ejs",data);
});

app.listen(port, () => {
    console.log("Server started on port:" + port);
})