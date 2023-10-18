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
    setActivePage(0);
    res.render("cover.ejs",data);
});

app.get("/features", (req,res) => {
    setActivePage(1);
    res.render("feature.ejs",data);
});

app.listen(port, () => {
    console.log("Server started on port:" + port);
});

const data ={
    // HERO
    heroTitle: "Profesionalne usługi transportowe",
    heroButton: "Zarejestruj sie",
    activePage: [
        {
            aria: "false",
            className: "",
        },
        {
            aria: "false",
            className: "",
        },
        {
            aria: "false",
            className: "",
        },
        {
            aria: "false",
            className: "",
        }],
};

function setActivePage(e){
    for(var i=0;i<4;i++){
        if(e===i){
            data.activePage[i].className="active";
            data.activePage[i].aria="page";
        } else{
        data.activePage[i].aria="false";
        data.activePage[i].className="";
        }
    }
}