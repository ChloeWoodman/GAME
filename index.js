const express = require('express');
const bodyParser = require("body-parser");

const app = express();

//form code decode midware
app.use(express.urlencoded({
  extended: false
}));

//create application/json parser
const jsonParser = bodyParser.json(); //declare JSON parser

//define the static folder for resource
app.use(express.static('resources/'));

//default page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


//game page
app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/script1.html');
});


//Login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/Login.html');
});

//submit handling RESTful API
const fs = require("fs");

app.post('/save', jsonParser, (req, res) => {
  let name = req.body.name;
  let pass = req.body.pass;
  console.log("Input username and password = " + name + 
 pass);
  let myJson = { error: false, data: name + pass };
  
  let newJson; //create new input JSON

  fs.readFile("./security/user.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    
    newJson = JSON.parse(jsonString);
    console.log("Old JSON is:", jsonString); 
    console.log("Old JSON obj is ", newJson[0]);


    if(newJson == null){
      console.log("JSON file is empty");
          let newUser = [{username:name},{password:pass}];

          //jsonString = 
          fs.writeFile('./security/user.json', JSON.stringify(newUser), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
  

    }else{
      //if has array items already 
      let newUser = [{username:name},{password:pass}];
      newJson.push(newUser);
       fs.writeFile('./security/user.json', JSON.stringify(newJson), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })

    }


  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }

});

  if ((name == "user1") && (pass == 123)){
    console.log("correct user");
    return res.json(myJson);
  } else {
    //get the receieved JSON string
    myJson = { error: true, data: "Wrong user name" };
    return res.json(myJson);
  }
});

//register page
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

//404 page
app.get('*', (req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});


app.listen(3000, () => {
  console.log("Server started");
})