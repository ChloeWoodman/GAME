import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.145.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.145.0/examples/jsm/loaders/GLTFLoader.js';


//VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let controls; //This variable is used for orbit control
let leftstate = false; //variable for leftstate for left button movement
let rightstate = false; //variable for rightstate for right button movement
let leftPressed = false; //arrow controls left
let rightPressed = false; //arrow controls right
var score = 1;
var scoreName = document.getElementById("score");
var health = 3;
var healthName = document.getElementById("health")
//let hurt = false;
//let healthTimer = 0;
var diffcultySpeed = 0.06;

//NEW SCENE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //perspective camera
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let assetLoader = false;

//LOADING MANAGER ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const manager = new THREE.LoadingManager();
manager.onStart = function(url, itemsLoaded, itemsTotal) {

  console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
  //using math to calculate number of loading, divide by total and times 100 for loading bar to show loading percentage
  progressBar.value = (itemsLoaded / itemsTotal) * 100;

};

const progressBarContainer = document.querySelector(".progress-bar-container");

//calls when loading is complete
manager.onLoad = function() {
  assetLoader = true;
  console.log('Loading complete!');
  progressBarContainer.style.display = "none";

};

//gets progress bar style sheet info
const progressBar = document.getElementById("progress-bar");
//shows loading progress
manager.onProgress = function(url, itemsLoaded, itemsTotal) {

  console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

};
//calls if loading eror
manager.onError = function(url) {

  console.log('There was an error loading ' + url);

};

//AUDIO LOADER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader(manager);
audioLoader.load('/audio/LaikaBGAudio.mp3', function(buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.01);
  sound.play();
});


const starSound = new THREE.Audio(listener);
audioLoader.load('/audio/starget.mp3', function(buffer) {
  starSound.setBuffer(buffer);
  starSound.setLoop(false);
  starSound.setVolume(.5);
});

const hurtSound = new THREE.Audio(listener);
audioLoader.load('/audio/death2.mp3', function(buffer) {
  hurtSound.setBuffer(buffer);
  hurtSound.setLoop(false);
  hurtSound.setVolume(.3);
});

//LIGHTING +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//ambient light
const light = new THREE.AmbientLight(0xFFFFFF); // soft white light
scene.add(light);

// lavender coloured directional light at 70% intensity shining from the top.
const directionalLight = new THREE.DirectionalLight(0xE6E6FA, 0.7);
scene.add(directionalLight);
const object = THREE.Object3D;
let scene12 = new THREE.Object3D;


//ADD POINTS INTO GAME +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//add points
const vertices = [];

for (let i = 0; i < 1000; i++) {

  //distance between each point
  const x = THREE.MathUtils.randFloatSpread(1000);
  const y = THREE.MathUtils.randFloatSpread(1000);
  const z = THREE.MathUtils.randFloatSpread(1000);

  vertices.push(x, y, z);

}


//GEOMETRYS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//first geometry - circle asteroid
const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load("/textures/asteroidtexture.png") });
const circle = new THREE.Mesh(geometry, material);
circle.position.set(0, 0, -17);
scene.add(circle);

//bounding sbox asteroid 1
let circle1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
circle1BB.setFromObject(circle);


//second geometry - circle asteroid
const geometry2 = new THREE.SphereGeometry();
const material2 = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load("/textures/asteroidtexture.png") });
const circle2 = new THREE.Mesh(geometry2, material2);
circle2.position.set(5, 0, -25);
scene.add(circle2);

//bounding box asteroid 2
let circle2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
circle2BB.setFromObject( circle2 );

//third geometry - circle asteroid
const geometry12 = new THREE.SphereGeometry();
const material12 = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load("/textures/asteroidtexture.png") });
const circle3 = new THREE.Mesh(geometry12, material12);
circle3.position.set(-5, 0, -35);
scene.add(circle3);

//bounding box asteroid 3
let circle3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
circle3BB.setFromObject( circle3 );

//ring geometry 
const geometry13 = new THREE.RingGeometry(5, 10, 8);
const material13 = new THREE.MeshPhongMaterial({ color: 0x00ffd5, side: THREE.DoubleSide, shininess: 100 });
const mesh12 = new THREE.Mesh(geometry13, material13);
mesh12.position.set(0, 0, -10);
scene.add(mesh12);

//ring geometry 2
const geometry14 = new THREE.RingGeometry(1, 4.5, 8);
const material14 = new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide, shininess: 2 });
const mesh13 = new THREE.Mesh(geometry14, material14);
mesh13.position.set(0, 0, -10);
scene.add(mesh13);

//Octahedron Geometry - Stardust 1
const geometry15 = new THREE.OctahedronGeometry(1, 0);
const material15 = new THREE.MeshNormalMaterial()
const stardust1 = new THREE.Mesh(geometry15, material15);
stardust1.position.set(-5, 0, -17)
scene.add(stardust1)

//Mini Octahedron Geometry - Stardust 1
const mgeometry15 = new THREE.OctahedronGeometry(0.5, 0);
const mmaterial15 = new THREE.MeshNormalMaterial()
const mstardust1 = new THREE.Mesh(mgeometry15, mmaterial15);
mstardust1.position.set(-4, 1, -17)
scene.add(mstardust1)

//bounding box for stardust
let starBB1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
starBB1.setFromObject( stardust1 );

//Octahedron Geometry - Stardust 2
const geometry16 = new THREE.OctahedronGeometry(1, 0);
const material16 = new THREE.MeshNormalMaterial()
const stardust2 = new THREE.Mesh(geometry16, material16);
stardust2.position.set(0, 0, -20)
scene.add(stardust2)

//Mini Octahedron Geometry - Stardust 2
const mgeometry16 = new THREE.OctahedronGeometry(0.5, 0);
const mmaterial16 = new THREE.MeshNormalMaterial()
const mstardust2 = new THREE.Mesh(mgeometry16, mmaterial16);
mstardust2.position.set(-1, -1, -20)
scene.add(mstardust2)

//bounding box for stardust 2
let starBB2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
starBB2.setFromObject( stardust2 );

//Octahedron Geometry - Stardust 3
const geometry17 = new THREE.OctahedronGeometry(1, 0);
const material17 = new THREE.MeshNormalMaterial()
const stardust3 = new THREE.Mesh(geometry17, material17);
stardust3.position.set(5, 0, -25)
scene.add(stardust3)

//Mini Octahedron Geometry - Stardust 3
const mgeometry17 = new THREE.OctahedronGeometry(0.5, 0);
const mmaterial17 = new THREE.MeshNormalMaterial()
const mstardust3 = new THREE.Mesh(mgeometry17, mmaterial17);
mstardust3.position.set(6, 1, -25)
scene.add(mstardust3)

//bounding box for stardust 3
let starBB3 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
starBB3.setFromObject( stardust3 );

//GLTF loading PLAYER
const gltfLoader = new GLTFLoader(manager);

gltfLoader.load(
  // resource URL
  '/models/laikarocket2.glb',
  // called when the resource is loaded
  function(gltf) {
    scene12 = gltf.scene;
    scene.add(scene12);
  });

//transparent geometry for Laika bounding box
const geometry18 = new THREE.BoxGeometry( 2, 1.2, 3 );
const material18 =  new THREE.MeshLambertMaterial({transparent: true, opacity: 0})
const tCube1 = new THREE.Mesh( geometry18, material18);
tCube1.position.set(0, 0, -1);
scene.add( tCube1 );

//bounding box 1
let LaikaBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
LaikaBB.setFromObject( tCube1 );


//point geometry
const geometry3 = new THREE.BufferGeometry();
geometry3.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
//initiate object and set model path
//creating texture loader
const textureloader = new THREE.TextureLoader(manager);
//setting a texture and size
let texture = textureloader.load("/textures/planet.png");
const material3 = new THREE.PointsMaterial({ map: texture, size: 3 });

//setting texture 2 and size
texture = textureloader.load("/textures/galaxy.png");
const points = new THREE.Points(geometry3, material3);
scene.add(points);
const material4 = new THREE.PointsMaterial({ map: texture, color: 0x888888, size: 5, transparent: true, opacity: 0.5 });
const points2 = new THREE.Points(geometry3, material4);
scene.add(points2);

//GAME START +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var getScore = true;
healthName.innerText = "Lives: " + health;
scoreName.innerText = "Score: ";

//COLLISIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function checkCollisions() {
  if (getScore == true) {
    //intersecting TOUCHING test
    if (LaikaBB.intersectsBox(circle1BB)) {
      animation1();
      health -= 1;
      healthName.innerHTML = "Health: " + health;
      circle.position.z = -40;
      circle.position.x = -10 + getRandomInt(20);
      hurtSound.play();
    } else {
      circle.material.opacity = 1.0;
    }
      if (LaikaBB.intersectsBox(circle2BB)) {
      animation2();
      health -= 1;
      healthName.innerHTML = "Health: " + health;
      circle2.position.z = -40;
      circle2.position.x = -10 + getRandomInt(20);
      hurtSound.play();
    } else {
      circle2.material.opacity = 1.0;
    }
    if (LaikaBB.intersectsBox(circle3BB)) {
      animation3();
      health -= 1;
      healthName.innerHTML = "Health: " + health;
      circle3.position.z = -40;
      circle3.position.x = -10 + getRandomInt(20);
      hurtSound.play();
    } else {
      circle3.material.opacity = 1.0;
    }
    if (LaikaBB.intersectsBox(starBB1)) {
      score += 1;
      scoreName.innerHTML = "Score: " + score;
      starSound.play();
      starGroup1.position.z = -17;
      
    }
    if (LaikaBB.intersectsBox(starBB2)) {
      score += 1;
      scoreName.innerHTML = "Score: " + score;
      starSound.play();
      starGroup2.position.z = -20;
    }
    if (LaikaBB.intersectsBox(starBB3)) {
      score += 1;
      scoreName.innerHTML = "Score: " + score;
      starSound.play();
      starGroup3.position.z = -25;
    }
  }
}



//ASTEROID COLLISION ANIMATION +++++++++++++++++++++++++++++++++++++++++++++++++++++++

//animations for asteroids when collided with
function animation1(){
  circle.material.transparent = true;
  circle.material.opacity = 0.5;
  circle.material.color = new THREE.Color(Math.random() * 0xffffff)
}

function animation2(){
  circle2.material.transparent = true;
  circle2.material.opacity = 0.5;
  circle2.material.color = new THREE.Color(Math.random() * 0xffffff)
}

function animation3(){
  circle3.material.transparent = true;
  circle3.material.opacity = 0.5;
  circle3.material.color = new THREE.Color(Math.random() * 0xffffff)
}
    

//randomplacement
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


//MAKES GROUP ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//add as a group 
//similar to Object3D, used to make working with groups of objects syntactically clearer
const aGroupSample = new THREE.Group();
mesh13.rotation.z -= 0.01;
mesh12.rotation.z -= 0.01;
aGroupSample.add(mesh13, mesh12);
scene.add(aGroupSample); //add this group to scene (not the individual mesh!)

const starGroup1 = new THREE.Group();
stardust1.rotation.x += 0.01;
mstardust1.rotation.x -= 0.01;
starGroup1.add(stardust1, mstardust1);
scene.add(starGroup1);

const starGroup2 = new THREE.Group();
stardust2.rotation.x += 0.01;
mstardust2.rotation.x -= 0.01;
starGroup2.add(stardust2, mstardust2);
scene.add(starGroup2);

const starGroup3 = new THREE.Group();
stardust3.rotation.x += 0.01;
mstardust3.rotation.x -= 0.01;
starGroup3.add(stardust3, mstardust3);
scene.add(starGroup3);


//CAMERA ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//camera position
camera.position.z = 5;
camera.position.y = 5;

//ANIMATE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//animate
const animate = function() {
  //calls a function after a number of milliseconds. 1 second = 1000 milliseconds
  setTimeout(function() {

    requestAnimationFrame(animate);
    //makes camera follow Laika
    camera.position.x = scene12.position.x;
    camera.position.z = scene12.position.z + 6;

    //x axis border
    if ((scene12.position.x)&&(tCube1.position.x) <= -10) {
      rightPressed = false;
      leftstate = false;

      console.log("Reached right border");
    }
    else if ((scene12.position.x)&&(tCube1.position.x) >= 10) {
      leftPressed = false;
      rightstate = false;
      console.log("Reached left border");
    }           
  }, 1000 / 60); 
  // ^ 60 fps frame rate, 1 second = 1000 milliseconds, / 60 so 60 frames in 1000 milliseconds 

  if (assetLoader) {
    //do animate here

    //rotation the points in surroundings
    points.rotation.y -= 0.001;
    points2.rotation.y += 0.001;

    //rotates circle and brings forward
    circle.rotation.x += 0.01;
    circle.rotation.y += 0.01;
    circle.position.z += diffcultySpeed;
    circle2.rotation.x += 0.01;
    circle2.rotation.y += 0.01;
    circle2.position.z += diffcultySpeed;
    circle3.rotation.x += 0.01;
    circle3.rotation.y += 0.01;
    circle3.position.z += diffcultySpeed;

    //rotates stardust and brings forward
    stardust1.rotation.x += 0.01;
    mstardust1.rotation.x -= 0.01;
    starGroup1.position.z += diffcultySpeed;
    stardust2.rotation.x += 0.01;
    mstardust2.rotation.x -= 0.01;
    starGroup2.position.z += diffcultySpeed;
    stardust3.rotation.x += 0.01;
    mstardust3.rotation.x -= 0.01;
    starGroup3.position.z += diffcultySpeed;

    //brings rings forward
    mesh12.position.z += 0.1;
    mesh13.position.z += 0.1;

    //makes rocket model positioned
    scene12.rotation.x = 1;
    scene12.rotation.z = 3.1;
    tCube1.rotation.x = -0.25;
    tCube1.position.y = -1;
    

    //add up state update animation
    if (leftstate) {
      scene12.position.x -= 0.1;
      tCube1.position.x -= 0.1;

    } else if (rightstate) {
      scene12.position.x += 0.1;
      tCube1.position.x += 0.1;
    }
    if (leftPressed) {
      scene12.position.x += 0.1;
      tCube1.position.x += 0.1;
    } else if (rightPressed) {
      scene12.position.x -= 0.1;
      tCube1.position.x -= 0.1;
    }

    
    //keeps bounding box updated with movement
    LaikaBB.copy(tCube1.geometry.boundingBox).applyMatrix4(tCube1.matrixWorld);
    
    //circle 1 bounding box updated with movement
    circle1BB.copy(circle.geometry.boundingBox).applyMatrix4(circle.matrixWorld);
    //circle 2 bounding box updated with movement
    circle2BB.copy(circle2.geometry.boundingBox).applyMatrix4(circle2.matrixWorld);
    //circle 3 bounding box updated with movement
    circle3BB.copy(circle3.geometry.boundingBox).applyMatrix4(circle3.matrixWorld);

    //stardust1 bounding box updated with movemenet
    starBB1.copy(stardust1.geometry.boundingBox).applyMatrix4(stardust1.matrixWorld);
    //stardust2 bounding box updated with movemenet
    starBB2.copy(stardust2.geometry.boundingBox).applyMatrix4(stardust2.matrixWorld);
    //stardust3 bounding box updated with movemenet
    starBB3.copy(stardust3.geometry.boundingBox).applyMatrix4(stardust3.matrixWorld);

    
    //function to check for collisions
    checkCollisions();

    //increase speed function
    increaseSpeed();

    //function for game over
    gameOver();
    
    //rendering scene and camera
    renderer.render(scene, camera);

    //RESPAWN ASTEROIDS
    if (circle.position.z >= 5) {
      circle.position.z = -40;
      circle.position.x = -10 + getRandomInt(20);
    }
    if (circle2.position.z >= 5) {
      circle2.position.z = -40;
      circle2.position.x = -10 + getRandomInt(20);
    }
    if (circle3.position.z >= 5) {
      circle3.position.z = -40;
      circle3.position.x = -10 + getRandomInt(20);
    }

    //RESPAWN STARDUST
    if (starGroup1.position.z >= 20) {
      starGroup1.position.z = -17;
    }
    if (starGroup2.position.z >= 30) {
      starGroup2.position.z = -20;
    }
    if (starGroup3.position.z >= 40) {
      starGroup3.position.z = -25;
    }
  }
};

//ARROW CONTROLS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//arrow controls
const keyDownHandler = (event) => {
  if (event.keyCode == 39) {
    leftPressed = true;
    rightstate = false;
    leftstate = false;
  } else if (event.keyCode == 37) {
    rightPressed = true
    rightstate = false;
    leftstate = false;
  }
}

//stop arrow controls
const keyUpHandler = (event) => {
  if (event.keyCode == 39) {
    leftPressed = false;
    rightstate = false;
    leftstate = false;
  } else if (event.keyCode == 37) {
    rightPressed = false;
    rightstate = false;
    leftstate = false;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


//WINDOW RESIZER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Resize window 
function onWindowResize() {

  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize); //end of resize window

//add event function
const moveleft = () => {
  leftstate = true;
  rightstate = false;
}
const moveright = () => {
  rightstate = true;
  leftstate = false;

}

//add button control event
document.getElementById("leftbutton").addEventListener("click", moveleft);
document.getElementById("rightbutton").addEventListener("click", moveright);

//DIFFICULTY INCREASE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function increaseSpeed() {
  if ((score >= 5)&&(score <= 100)) {
    diffcultySpeed += 0.0001;
  }
}


//GAME OVER ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var gameOverTitle = document.getElementById("gameOverTitle");
var gameOverSummary = document.getElementById("gameOverScore");

function gameOver() {
  if (health <= 0)
  {
    scene.remove(circle, circle2, circle3, scene12, tCube1);
    getScore = false;
    gameOverTitle.innerText = "Game Over";
    gameOverScore.innerText = "Good job! Your score was " + score;
    healthName.innerText = "";
    scoreName.innerText = "";
  }
}

//ORBIT CONTROL +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//orbit controls allow camera to orbit around center of surround field
const createControls = () => {
  //initialise orbit control
  controls = new OrbitControls(camera, renderer.domElement);

  //controls.update() must be called after any manual changes to the camera's transform
  controls.update();
}

//use the control function
createControls();

//we animate at the bottom because code works from top bottom, making rendering last so user doesnt wait too long
animate();