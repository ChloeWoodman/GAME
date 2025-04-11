const express = require('express');
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
//const socketio = require('socket.io');
const http = require('http');
const bcrypt = require('bcryptjs'); //encrypting password

const app = express(); //setup express app
const server = http.Server(app); //set up server
//const io = socketio(server); //attach socket.io to server 
//create application/json parser
const jsonParser = bodyParser.json(); //declare JSON parser


//form code decode midware
app.use(express.urlencoded({
  extended: false
}));


//define the static folder for resource
app.use(express.static('resources/'));


//DEFAULT PAGE +++++++++++++++++++++++++++++++++++
//default page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//GAME PAGE +++++++++++++++++++++++++++++++++++++++
//game page
app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/script1.html');
});

app.post('/score', jsonParser, async (req, res) => {
  // Get the username and score from the request body
  let user3 = req.body.name;
  let highscore = req.body.highscore;

  // Read the contents of the JSON file
  const fs = require('fs');
  const filePath = './security/user.json';
  let jsonString = fs.readFileSync(filePath, 'utf8');

  // Parse the JSON string into a JavaScript object
  const data = JSON.parse(jsonString);

  // Flag to track whether a matching object was found
  let found = false;

  //check score
  //let found2 = false;

  // Loop over the array of objects in the data variable
  for (let i = 0; i < data.length; i++) {
    // Check if the username match any of the objects in the data array
    console.log(data[i].username, user3);
    if (data[i].username === user3) {
      console.log("match found");
      //If a match is found, set the high score to the current score if it's higher
      console.log(highscore);
      console.log(user3);
      if (highscore > data[i].highscore) {
        console.log("Updating highscore")
        data[i].highscore = highscore;
        found = true;
      } 
      else {
        console.log("Score is not higher than current highscore");
      }
      
      break;
    } 
    else {
      console.log("Match not found");
    }
  }

  // Convert the updated data array back to a JSON string
  const updatedJsonString = JSON.stringify(data);

  // Write the updated JSON string to the file
  fs.writeFileSync(filePath, updatedJsonString);

  if (found) {
  // Send a success response back to the client
  res.json({error: false, data: "High score updated successfully"});
  } else {
  res.json({error: true, data: "Username wrong or score is not higher than current highscore"});
  }
});

//REGISTER PAGE ++++++++++++++++++++++++++++++++++++++
//Register page
app.get('/register', async (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

//submit handling RESTful API
const fs = require("fs");

app.post('/save', jsonParser, async (req, res) => {
  let name = req.body.name;
  // Hash the password using bcrypt
  let hashedPassword = await bcrypt.hash(req.body.pass, 10); 

  fs.readFile("./security/user.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try { 
      let newJson = JSON.parse(jsonString);
      console.log("Old JSON is:", jsonString); 
      console.log("Old JSON obj is ", newJson[0]);

      // Check if a user with the same username already exists
      let existingUser = newJson.find(user => user.username === name);
      if (existingUser) {
        // If a user with the same username already exists, return an error message
        res.status(400).send({ error: "Username already taken" });
        return;
      }

      // If a user with the same username does not already exist, add the new user
      let newUser = {
        username: name, 
        password: hashedPassword,
        highscore: 0
      };
      newJson.push(newUser);

      // Write the updated array back to the JSON file
      fs.writeFile('./security/user.json', JSON.stringify(newJson), err => {
        if (err) {
          console.log('Error writing file', err);
        } else {
          console.log("Successfully wrote file");
        }
      });

      res.send({ error:false, data:"Success"})
    } catch(err) {
      console.log("Error parsing JSON string:", err);
    }
  });
});



//LOGIN PAGE ++++++++++++++++++++++++++++++++++
//login page
app.get('/login', jsonParser, async (req, res) => {
  res.sendFile(__dirname + '/Login.html');
});

app.post('/auth', jsonParser, async (req, res) => {
  let name2 = req.body.name;
  let password = req.body.password;

  const fs = require('fs');
  
  const filePath = './security/user.json';
  
  let jsonString;
  try {
    jsonString = fs.readFileSync(filePath, 'utf8');
  } catch(err) {
    console.error(err);
  }
  
  const data = JSON.parse(jsonString);
  
  // Loop over the array of objects in the data variable
  let myJson;
  for (let i = 0; i < data.length; i++) {
    // Check if the username and password match any of the objects in the data array
    if (data[i].username == name2) {
      // Compare the entered password with the hashed password stored in the JSON file
      let passwordMatch = await bcrypt.compare(password, data[i].password);
      if (passwordMatch) {
        // If a match is found, set the response to a success message
        console.log("correct user");
        myJson = {error:false, data:"User authenticated successfully", highscore: data[i].highscore};
        break;
      }
    }
  }

  // If no match was found, set the response to an error message
  if (myJson === undefined) {
    console.log("Incorrect user");
    myJson = {error:true, data:"Wrong user name or password"};
  }

  // Send the response
  res.send(myJson);
});


//404 PAGE +++++++++++++++++++++++++++++++++++++++
//404 page
app.get('*', (req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});

//PORT +++++++++++++++++++++++++++++++++++++++++++
app.listen(3000, () => {
  console.log("Server started");
})