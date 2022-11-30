import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.145.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.145.0/examples/jsm/loaders/GLTFLoader.js';
//import { OBB } from 'https://unpkg.com/three@0.145.0/examples/jsm/math/OBB.js';


let controls; //This variable is used for orbit control
let leftstate = false; //variable for leftstate for left button movement
let rightstate = false; //variable for rightstate for right button movement
let leftPressed = false; //arrow controls left
let rightPressed = false; //arrow controls right
let score = 1;
let health = 3;
let hurt = false;

//new scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //perspective camera
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//login details
function report() {

  var name = document.getElementById("uname").value;
  alert(name);
}

let assetLoader = false;

//loading manager
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

//audio
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


//first geometry - circle asteroid
const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load("/textures/asteroidtexture.png") });
const circle = new THREE.Mesh(geometry, material);
circle.position.set(0, 0, -17);
scene.add(circle);

//second geometry - circle asteroid
const geometry2 = new THREE.SphereGeometry();
const material2 = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load("/textures/asteroidtexture.png") });
const circle2 = new THREE.Mesh(geometry2, material2);
circle2.position.set(5, 0, -25);
scene.add(circle2);

//third geometry - circle asteroid
const geometry12 = new THREE.SphereGeometry();
const material12 = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load("/textures/asteroidtexture.png") });
const circle3 = new THREE.Mesh(geometry12, material12);
circle3.position.set(-5, 0, -35);
scene.add(circle3);




//add points
const vertices = [];

for (let i = 0; i < 1000; i++) {

  //distance between each point
  const x = THREE.MathUtils.randFloatSpread(1000);
  const y = THREE.MathUtils.randFloatSpread(1000);
  const z = THREE.MathUtils.randFloatSpread(1000);

  vertices.push(x, y, z);

}

//point geometry
const geometry3 = new THREE.BufferGeometry();
geometry3.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
//initiate object and set model path
//creating texture loader
const textureloader = new THREE.TextureLoader(manager);
//setting a texture and size
let texture = textureloader.load("/textures/planet.png");
const material3 = new THREE.PointsMaterial({ map: texture, size: 3 })

//setting texture 2 and size
texture = textureloader.load("/textures/galaxy.png");
const points = new THREE.Points(geometry3, material3);
scene.add(points);
const material4 = new THREE.PointsMaterial({ map: texture, color: 0x888888, size: 5, transparent: true, opacity: 0.5 });
const points2 = new THREE.Points(geometry3, material4);
scene.add(points2);

//GLTF loading
const gltfLoader = new GLTFLoader(manager);

gltfLoader.load(
  // resource URL
  '/models/laikarocket2.glb',
  // called when the resource is loaded
  function(gltf) {
    scene12 = gltf.scene;
    scene.add(scene12);

  });
//const laika = scene12;

//stardust
const gltfLoader2 = new GLTFLoader(manager);
gltfLoader2.load(
  // resource URL
  '/models/star.glb',
  // called when the resource is loaded
  function(gltf) {
    //gltf.scene13.position.set(0,0,-12);
    //scene13 = gltf.scene;
    scene.add(gltf.scene13);

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

  });







//ring geometry loader for loading screen
const geometry13 = new THREE.RingGeometry(5, 10, 8);
const material13 = new THREE.MeshPhongMaterial({ color: 0x00ffd5, side: THREE.DoubleSide, shininess: 100 });
const mesh12 = new THREE.Mesh(geometry13, material13);
mesh12.position.set(0, 0, -10);
scene.add(mesh12);

//ring geometry 2 loader for loading screen
const geometry14 = new THREE.RingGeometry(1, 4.5, 8);
const material14 = new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide, shininess: 2 });
const mesh13 = new THREE.Mesh(geometry14, material14);
mesh13.position.set(0, 0, -10);
scene.add(mesh13);

//ambient light
const light = new THREE.AmbientLight(0xFFFFFF); // soft white light
scene.add(light);

// lavender coloured directional light at 70% intensity shining from the top.
const directionalLight = new THREE.DirectionalLight(0xE6E6FA, 0.7);
scene.add(directionalLight);
const object = THREE.Object3D;
let scene12 = new THREE.Object3D;


//EDIT - Collision ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*

const pbox = new THREE.Box3().setFromObject(scene12);
scene12.geometry.obb = new OBB().fromBox3(scene12)
scene12.userData.obb = new OBB();

const abox1 = new THREE.Box3().setFromObject(circle);
circle.geometry.obb = new OBB().fromBox3(abox1)
circle.userData.obb = new OBB();

const abox2 = new THREE.Box3().setFromObject(circle2);
circle2.geometry.obb = new OBB().fromBox3(abox2)
circle2.userData.obb = new OBB();

const abox3 = new THREE.Box3().setFromObject(circle3);
circle3.geometry.obb = new OBB().fromBox3(abox3)
circle3.userData.obb = new OBB();
*/




//add as a group 
//similar to Object3D, used to make working with groups of objects syntactically clearer
const aGroupSample = new THREE.Group();
mesh13.rotation.z -= 0.01;
mesh12.rotation.z -= 0.01;
aGroupSample.add(mesh13, mesh12);
scene.add(aGroupSample); //add this group to scene (not the individual mesh!)

const group = new THREE.Group();
group.add(circle, circle2, circle3);
scene.add(group);
//end of add group

//camera position
camera.position.z = 5;
camera.position.y = 5;

//animate
const animate = function() {
  //calls a function after a number of milliseconds. 1 second = 1000 milliseconds
  setTimeout(function() {

    requestAnimationFrame(animate);
    //makes camera follow cube
    camera.position.x = scene12.position.x;
    camera.position.z = scene12.position.z + 6;


    /*
    //EDIT - Collision assignment +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    laika.userData.obb.copy(laika.geometry.obb)
    circle.userData.obb.copy(circle.geometry.obb)
    circle2.userData.obb.copy(circle2.geometry.obb)
    circle3.userData.obb.copy(circle3.geometry.obb)

    laika.userData.obb.applyMatrix4(laika.matrixWorld)
    circle.userData.obb.applyMatrix4(circle.matrixWorld)
    circle2.userData.obb.applyMatrix4(circle2.matrixWorld)
    circle3.userData.obb.applyMatrix4(circle3.matrixWorld)
    
    */


    //x axis border
    if (scene12.position.x <= -10) {
      rightPressed = false;
      rightstate = false;
      console.log("Reached right border")
    }
    else if (scene12.position.x >= 10) {
      leftPressed = false;
      leftstate = false;
      console.log("Reached left border")
    }

    //reset mesh after passing past camera 
    //if (group.position.x > camera.position.x)     {
    //group.position.reset();
    //}

  }, 1000 / 60); //60 fps frame rate, 1 second = 1000 milliseconds, / 60 so 60 frames in 1000 milliseconds 

  if (assetLoader) {
    //do animate here

    //rotation the points in surroundings
    points.rotation.y -= 0.001;
    points2.rotation.y += 0.001;

    //rotates circle and brings forward
    circle.rotation.x += 0.01;
    circle.rotation.y += 0.01;
    circle2.rotation.x += 0.01;
    circle2.rotation.y += 0.01;
    circle3.rotation.x += 0.01;
    circle3.rotation.y += 0.01;
    group.position.z += 0.06;

    //brings rings forward
    mesh12.position.z += 0.1;
    mesh13.position.z += 0.1;

    //makes rocket model positioned
    scene12.rotation.x = 1;
    scene12.rotation.z = 3.1;

    //add up state update animation
    if (leftstate) {
      scene12.position.x += 0.05;

    } else if (rightstate) {
      scene12.position.x -= 0.05;
    }
    if (leftPressed) {
      scene12.position.x += 0.1;
    } else if (rightPressed) {
      scene12.position.x -= 0.1;
    }

    /*
    //EDIT - Collision Check ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (circle.userData.obb.intersectsOBB(laika.userData.obb)){
      health -= 1;
      hurt = true;
      var healthTimer = 60;
    }

    //EDIT - invincibility frames++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (healthTimer >= 1){
      healthTimer -= 1;
    }
    else {
      hurt = false;
    }
    */

    score++;

    //document.getElementById("score").innerHTML = score;

    renderer.render(scene, camera);
  }
};

//arrow controls
const keyDownHandler = (event) => {
  if (event.keyCode == 39) {
    leftPressed = true;
  } else if (event.keyCode == 37) {
    rightPressed = true;
  }
}

//stop arrow controls
const keyUpHandler = (event) => {
  if (event.keyCode == 39) {
    leftPressed = false;
  } else if (event.keyCode == 37) {
    rightPressed = false;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


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


/**
*Create orbit control main function
*/
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
