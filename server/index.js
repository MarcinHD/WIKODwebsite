import express from "express";
import body from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(body.urlencoded({extended: true}));


  // < -- EXPRESS ROUTER --> 
app.get("/home", (req,res) => {
    setActivePage(0);
    res.render("cover.ejs",data);
});

app.get("/features", (req,res) => {
    setActivePage(1);
    res.render("feature.ejs",data);
});
app.get("/orders", (req,res) => {
    setActivePage(2);
    res.render("orders.ejs",data);
});
app.get("/contact", (req,res) => {
    setActivePage(3);
    res.render("contact.ejs",data);
});
app.get("/login", (req,res) => {
    res.render("login.ejs")
});

app.get("/signup", (req,res) => {
    res.render("signup.ejs")
});
app.all("/", function(req, res) {
    res.redirect("http://localhost:"+port+"/home");
  });

  // < -- REACT PAGES --> 
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("/list", (req,res) => {
    console.log("List");
    res.sendFile(path.join(__dirname,"..","client","build","index.html"));
});

  // < -- REDIRECT REST --> 
app.all("*", function(req, res) {
    res.redirect("http://localhost:"+port+"/home");
  });

app.listen(port, () => {
    console.log("Server started on port:" + port);
});

const data ={
    port: port,
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
    data.activePage.forEach((w)=>{
            w.aria="false";
            w.className="";
        });
    data.activePage.at(e).aria="page";
    data.activePage.at(e).className="active";
}