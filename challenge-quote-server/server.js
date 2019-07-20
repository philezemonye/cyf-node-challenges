// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const bodyParse = require("body-parse")
const cors = require("cors")
const moment = require("moment")
const app = express();
app.use(bodyParse.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())

//load the quotes JSON
const Quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function(request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", (request, response)=>{
  response.send(Quotes)
})

app.get("/quotes/search", (request, response)=>{
  if(request.query.search === undefined){
    response.send("Not Found")
  }else{
    let searchedQuote = Quotes.filter(quote=>quote.author.toLowerCase().includes(request.query.search.toLowerCase()) || quote.quote.toLowerCase().includes(request.query.search.toLowerCase()))
  if(searchedQuote.length === 0){
    response.send({
      Message:"No Result FOUND"
    })
  }else{
    response.send(searchedQuote)
  }
  }
})

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  const pickFromArray = (arr) =>{
  return arr[Math.floor(Math.random() * arr.length)];
}
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
  app.listen(process.env.PORT || 3000, ()=>{
    console.log("Your app is listening on port: 3000");
  })
});
