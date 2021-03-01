const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname+"/date.js");

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const dailyList=["Exercise","Meditation"];
const workList=["Maths exam","Algorithm assignment","Codeforces"];

app.get("/",function(req,res){
    let day=date.getDate();
    res.render("list",{title:day,list:dailyList});
});

app.get("/work",function(req,res){
    res.render("list",{title:"Work List",list:workList});
});

app.post("/",function(req,res){
    let item=req.body.newItem;
    if(req.body.type==="Work"){
        workList.push(item);
        res.redirect("/work");
    }
    else{
        dailyList.push(item);
        res.redirect("/");
    }
});

app.post("/work",function(req,res){
    if(req.body.type==="Work"){
        res.redirect("/");
    }
    else{
        res.redirect("/work");
    }
});

app.listen(process.env.PORT||3000,function(){
    console.log("Server hss started successfully");
});