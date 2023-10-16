import express from "express";
import body from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(body.urlencoded({extended: true}));


app.get("/", (req,res) => {
    // res.sendFile(__dirname + "/public/index.html");
    // res.setHeader('content-type', 'application/javascript');
    res.render("cover.ejs",data);
});

app.get("/login", (req,res) => {
    res.render("login.ejs");
});

app.listen(port, () => {
    console.log("Server started on port:" + port);
});

const data ={
    // HERO
    heroTitle: "Profesionalne usługi transportowe",
    heroButton: "Zarejestruj sie",
};