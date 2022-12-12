const { response } = require("express");
const express = require("express");
const bodyParser= require('body-parser')
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>
{ 
    res.sendFile(__dirname +"/index.html")
});
app.post('/',(req,res)=>{
    // console.log(req.body.cityName)
    const query= req.body.cityName
    const apiKey ='53cd9ba6d1f0349f5f18a12864469477'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'&units=metric'
    https.get(url,
     (response)=>{
        // console.log(response.statusCode)
        response.on('data',(data)=>{
            // console.log(data);
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            console.log(description);
            console.log(temp);
            res.send(`The tempture in ${query} is ${temp}`)
        })
     })
    // res.send("Hello server running on port 3000")
})






app.listen(3000,()=> console.log("Server running on port 3000"))