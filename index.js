//mysql module
var mysql = require('mysql');
//express module
const express = require('express');
//fetch module
//const fetch = require('fetch');
//load .env file first
require('dotenv').config();
//express object constructor
const app = express();
//listen for requests at localhost 3000
app.listen(3000, () => console.log('We are live at localhost:3000'));
//not sure but accesses public folder
app.use(express.static('public'));
//limit the json amount at a time
app.use(express.json({ limit: '10mb' }));


//set up database connection to my mysql server
//for security use .env file
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD, 
  database: "DQXI"
});

//run connect to database function
con.connect(function (err) {
  if (err) throw err;
  console.log("***Database Connection established***");

});





//this post method gets is used to change the main image using entered name
//in the image route
app.post('/image', (request, response) => {
  console.log("request recieved");
  console.log(request.body);
  //This is id received from front end
  const data = request.body;
//sql statement to find img using id, id is in variable for extra security
  var sql = "SELECT defaultImage FROM characters WHERE name =" + mysql.escape(data.name);
  //query function with error handling
  con.query(sql, function (err, result) {
    if (err) throw err;
    //return first row's img column value
    //future task to remove need to state first row since there is only 1 row being return
    const img = result[0].defaultImage;
    //put the variable into JSON format which allows it to be sent
    const JSONImg = { img };
    console.log("response sent")
    console.log(JSONImg)
    
    //create the response and send back the img in JSON format
    response.json(JSONImg)

  })



})



//this get method retrieves a list of all the character in the table
//in the list route
app.get('/list',(request,response) => {
  
  //get all names from character table
  var sql = "SELECT name FROM characters";
  //run query function and handle error
  con.query(sql, function (err, result) {
    if (err) throw err;
    
    //initialise variable to store results into
    var listNames = "";

    //loop to add names into listNames
    for (let i = 0; i < result.length; i++) {
      
      //space is important, will allow string to be split
      listNames += result[i].name +  " ";
    }
    
    
    
    //convert listName to JSON so it can be sent
    const JSONListNames = {listNames};
    console.log(JSONListNames)
    //send response
    response.json(JSONListNames)
    
  })
  
})
app.get('/list2',(request,response) => {
  
  //get all names from character table
  var sql = "SELECT name FROM characters";
  //run query function and handle error
  con.query(sql, function (err, result) {
    if (err) throw err;
    
    //initialise variable to store results into
    var listNames = "";

    //loop to add names into listNames
    for (let i = 0; i < result.length; i++) {
      
      //space is important, will allow string to be split
      listNames += result[i].name +  " ";
    }
    
    
    
    //convert listName to JSON so it can be sent
    const JSONListNames = {listNames};
    console.log(JSONListNames)
    //send response
    response.json(JSONListNames)
    
  })
  
})

app.get('/updateList/:characterClass', async (request,response) => {
  console.log("class type received")
  const classVar = request.params.characterClass
  //get all names from character table
  var sql = "SELECT name FROM characters Where class =" + mysql.escape(classVar);
  //run query function and handle error
  con.query(sql, function (err, result) {
    if (err) throw err;
    
    //initialise variable to store results into
    var listNames = "";

    //loop to add names into listNames
    for (let i = 0; i < result.length; i++) {
      
      //space is important, will allow string to be split
      listNames += result[i].name +  " ";
    }
    
    
    
    //convert listName to JSON so it can be sent
    const JSONListNames = {listNames};
    console.log(JSONListNames)
    //send response
    response.json(JSONListNames)
    
  })
  
})