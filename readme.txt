Laika is a 3D web game developed by Chloe Woodman. It is an endless runner based game that can be controlled via arrow keys and also left and right buttons to allow for mobile access. The game consists of a main page, start game page, login page, error 404 page and register page to allow for users to save their highest scores on their account.

The aim of this endless runner is to run as long as you can, by collecting star dust (which will be added in later updates) for points and avoiding asteroids - this is based on the actual Laika that was sent to space by the soviet space program in 1957!

  
  * Use left right buttons/arrow keys to control Laika 
  
  * Interact with buttons to navigate around the different web pages

Login uses XHR javascript call. It also demonstrate how to save data in a JSON file.(security/user.json). Everytime when a user submit data, the user name will be added in user.json file, which can be accessed and read for login and read and updated for user score.

Secure HTTPS file


The folder structure:
-index.js server page
-scrupt1.html  Game page
-login.html Login html page
-loginfailed.html Login Failed html page
-/resources/ contains all static files
---/css/ contains all .css files 
---/image/ contains all image files such as .jpg .png 
---/js/ contains all .js files. 
-----script1.js contains javascript code for game
-----script2.js contains javascript code for Login Sample 2 login.html
-/security/ contains secured data that can't be access directly. 
---user.json stores user submit data in a JSON format. 


Coding conventions used:
* Simple statement ends in semicolon
* Complex statement will not end in semicolon
* Opening bracket at the end of first line
* Using one space before opening bracket
* Lines are short in length, < 80 char
* camelCase hyphens
* Lower case file names


REFERENCES: 
earthgif.gif for html main page is from NASA
galaxy.png is from https://www.pngall.com/galaxy-png/download/14481
planet.png is from deviantart.com/dadrian/art/Red-and-blue-planet-stock-678128532
scoreicon is from https://www.pngkey.com/maxpic/u2e6w7i1e6o0w7o0/
XHR code, https://www.w3schools.com/xml/xml_http.asp, last updated at 29/11/2021
laikascorebg is from:https://gfycat.com/gifs/search/laika+space+dog
death2.mp3 comes from GFX Sounds https://www.youtube.com/watch?v=CJNkSwATa_4
starget.mp3 comes from Gravity Sound https://www.youtube.com/watch?v=zCp7IdpOo90
css style code for button : https://getcssscan.com/css-buttons-examples [button63]
css style code for left+right button : https://getcssscan.com/css-buttons-examples [button83]
css style code for retry button : https://getcssscan.com/css-buttons-examples [button73]
css style code for start button : https://getcssscan.com/css-buttons-examples [button53]
Game over title css code: https://codepen.io/alvarotrigo/pen/PoKMyNO
Loading screen javascript code: https://www.youtube.com/watch?v=zMzuPIiznQ4&t=267s&ab_channel=WaelYasmina
Collision code: https://www.youtube.com/watch?v=9H3HPq-BTMo&t=521s&ab_channel=flanniganable