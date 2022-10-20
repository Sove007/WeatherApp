const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
res.sendFile(__dirname+"/index.html")
});
app.post("/", function(req,res){
    // console.log("Post request");
//    console.log(req.body.cityName); 

// const query ="London";
const query =req.body.cityName;
const apiKey ="1c6be7a23fca7ef8669699424f28f7a2";
const unit ="metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+ unit;

https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
     const weatherData = JSON.parse(data)
    
    const temp = weatherData.main.temp
    // const feelLike = weatherData.main.feels_like
    const desc = weatherData.weather[0].description

    const icon = weatherData.weather[0].icon
    const imgURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png"
   
    res.write("<p>The Weather is currently "+ desc+" in "+query+".</p>");  //res.write kitna bhi likh sakte hai
    res.write("<h1>The Temprature in" +query+" is "+ temp+" degrees celcius.</h1>");
    res.write("<img src=" + imgURL+">")

    res.send();

    });
});
});
app.listen(3001, function(){
    console.log("Server is listening at port 3001.");
})