const express = require('express');
const bodyParser = require("body-parser");
const http = require('http');
const bcrypt = require('bcrypt'); 
const fs = require('fs');

const app = express();
const jsonParser = bodyParser.json();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('resources/'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/script1.html');
});

app.post('/score', jsonParser, async (req, res) => {
  let user3 = req.body.name;
  let highscore = req.body.highscore;
  const filePath = './security/user.json';
  let jsonString = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonString);
  let found = false;

  for (let i = 0; i < data.length; i++) {
    if (data[i].username === user3) {
      if (highscore > data[i].highscore) {
        data[i].highscore = highscore;
        found = true;
      }
      break;
    }
  }

  const updatedJsonString = JSON.stringify(data);
  fs.writeFileSync(filePath, updatedJsonString);

  if (found) {
    res.json({error: false, data: "High score updated successfully"});
  } else {
    res.json({error: true, data: "Username wrong or score is not higher than current highscore"});
  }
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.post('/save', jsonParser, async (req, res) => {
  let name = req.body.name;
  let hashedPassword = await bcrypt.hash(req.body.pass, 10);

  fs.readFile("./security/user.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }

    try {
      let newJson = JSON.parse(jsonString);
      let existingUser = newJson.find(user => user.username === name);
      if (existingUser) {
        res.status(400).send({ error: "Username already taken" });
        return;
      }

      let newUser = {
        username: name, 
        password: hashedPassword,
        highscore: 0
      };
      newJson.push(newUser);

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

app.get('/login', jsonParser, (req, res) => {
  res.sendFile(__dirname + '/Login.html');
});

app.post('/auth', jsonParser, async (req, res) => {
  let name2 = req.body.name;
  let password = req.body.password;
  const filePath = './security/user.json';
  let jsonString;
  
  try {
    jsonString = fs.readFileSync(filePath, 'utf8');
  } catch(err) {
    console.error(err);
  }

  const data = JSON.parse(jsonString);
  let myJson;

  for (let i = 0; i < data.length; i++) {
    if (data[i].username == name2) {
      let passwordMatch = await bcrypt.compare(password, data[i].password);
      if (passwordMatch) {
        myJson = {error:false, data:"User authenticated successfully", highscore: data[i].highscore};
        break;
      }
    }
  }

  if (myJson === undefined) {
    myJson = {error:true, data:"Wrong user name or password"};
  }

  res.send(myJson);
});

app.get('*', (req, res) => {
  res.status(404).sendFile(__dirname + '/404.html');
});

// Export the handler function
module.exports = (req, res) => {
  app(req, res);  // Vercel will handle the request to this function
};
