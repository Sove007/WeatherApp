const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req,res){

    const query ="London";
    const apiKey ="1c6be7a23fca7ef8669699424f28f7a2";
    const unit ="metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+ unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
        //   console.log(data);
         const weatherData = JSON.parse(data)
        //  console.log(weatherData);
        // const temp = weatherData.main.temp
        const temp = weatherData.main.temp
        const feelLike = weatherData.main.feels_like
        const desc = weatherData.weather[0].description

        const icon = weatherData.weather[0].icon
        const imgURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png"
        // res.send("<h2>The Weather is currently "+ desc+".</h2>"+"<h1>The Temprature in Delhi is "+ temp+" degrees celcius.</h1>"+icon) // my way of doing challange
        // res.write("<h1>Testing</h1>");  //res.write kitna bhi likh sakte hai
        res.write("<p>The Weather is currently "+ desc+".</p>");  //res.write kitna bhi likh sakte hai
        res.write("<h1>The Temprature in Delhi is "+ temp+" degrees celcius.</h1>");
        res.write("<img src=" + imgURL+">")

        res.send();

        // console.log(temp);
        // console.log(feelLike);
        // console.log(desc);


        // const obj = {
        //     name:"Saurav",
        //     favouriteFood:"momos"
        // }
        // console.log(JSON.stringify(obj));
        })
    })

    // res.send("Server is running")
})



app.listen(3000, function(){
    console.log("Server is listening at port 3000.");
})