const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const socketio = require('socket.io');
const http = require('http');
const bcrypt = require('bcrypt'); //encrypting password

const app = express(); //setup express app
const server = http.Server(app); //set up server
const io = socketio(server); //attach socket.io to server 
//create application/json parser
const jsonParser = bodyParser.json(); //declare JSON parser

//lets you use the cookieParser in your application
app.use(cookieParser());
//form code decode midware
app.use(express.urlencoded({
  extended: false
}));

//app.use(express.static("public")); //serve our static assets from public

//define the static folder for resource
app.use(express.static('resources/'));


//HANDLING CONNECTIONS +++++++++++++++++++++++++
/*const connections = [null, null];

// Handle a socket connection request from web client
io.on('connection', function (socket) {
  
  // Find an available player number
  let playerIndex = -1;
  for (var i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
    }
  }
  
  // Tell the connecting client what player number they are
  socket.emit('player-number', playerIndex);
  
  // Ignore player 3
  if (playerIndex == -1) return;
  
  connections[playerIndex] = socket;
  
  // Tell everyone else what player number just connected
  socket.broadcast.emit('player-connect', playerIndex);
});

socket.on('actuate', function (data) {
    const { grid, metadata } = data; // Get grid and metadata properties from client
    
    const move = {
      playerIndex,
      grid,
      metadata,
    };

    // Emit the move to all other clients
    socket.broadcast.emit('move', move);
  });

  socket.on('disconnect', function() {
    console.log(`Player ${playerIndex} Disconnected`);
    connections[playerIndex] = null;
  });*/


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

//REGISTER PAGE ++++++++++++++++++++++++++++++++++++++
//Register page
app.get('/register', async (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

//submit handling RESTful API
const fs = require("fs");

app.post('/save', jsonParser, async (req, res) => {
  let name = req.body.name;
  let pass = req.body.pass;
  console.log("Input username and password = " + name + 
 pass);
  //hashedPassword uses hash and salt from bcrypt to encrypt password (user data) for security on server side
  const hashedPassword = await bcrypt.hash(req.body.pass, 10) 
  let myJson = { error: false, data: name + hashedPassword };
  
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
          let newUser = [{username:name},{password:hashedPassword}];

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
          let newUser = [{username:name},{password:hashedPassword}];
        newJson.push(newUser);
     }
       fs.writeFile('./security/user.json', JSON.stringify(newJson), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }

  });

  /*if ((name == "user1") && (pass == 123)){
    console.log("correct user");
    return res.json(myJson);

  } else {
    //get the receieved JSON string
    myJson = { error: true, data: "Wrong user name" };
    return res.json(myJson);
  }*/
});

//LOGIN PAGE ++++++++++++++++++++++++++++++++++
//login page
app.get('/login', jsonParser, async (req, res) => {
  res.sendFile(__dirname + '/Login.html');
});

const fs2 = require("fs");

app.post('/post', jsonParser, async (req, res) => {

  
  fs2.readFile("./security/user.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
     return;
  }else {
      console.log("Read from file");
    }
  });
    
  const user = users.find(user => user.username == req.body.name)
  if (user == null) {
    console.log("Cannot find user");
  }
    //using bcrypt compare as will hash the inputted value and compare agaisnt actual hashed password 
  if (await bcrypt.compare(req.body.pass, user.password)) {
    console.log("Yes");
    return res.json(myJson);
  } else {
    console.log("Not allowed");
    myJson = { error: true, data: "Wrong username or password" };
    return res.json(myJson);
  }
    
});


//SCORE PAGE ++++++++++++++++++++++++++++++++++++++++
app.get('/score', (req, res) => {
  res.sendFile(__dirname + '/Score.html');
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