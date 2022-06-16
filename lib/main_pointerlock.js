let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
let renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

cam.position.set(0, -3.5, 5);

controls = new THREE.PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();

let btn = document.querySelector("#btn1")
btn.addEventListener('click', () => {
  controls.lock();
});

controls.addEventListener('lock', () => {
  btn.innerHTML = "Locked";
})
controls.addEventListener('unlock', () => {
  btn.innerHTML = "Unlocked";
})

let btn2 = document.querySelector("#btn2")
btn2.addEventListener('click', (e) => {
  cam.position.set(0, -3.5, 5);
  cam.rotation.x = 0;
  cam.rotation.y = 0;
  cam.rotation.z = 0;
});

let btn3D = document.querySelector("#btn3D")
btn3D.addEventListener('click', (e) => {
  cam.position.set(0, -3.5, -3);
  cam.rotation.x = 0;
  cam.rotation.y = 0;
  cam.rotation.z = 0;
});
let btn2D = document.querySelector("#btn2D")
btn2D.addEventListener('click', (e) => {
  cam.position.set(0, -3.5, -10);
  cam.rotation.x = 0;
  cam.rotation.y = 0;
  cam.rotation.z = 0;
});

let keyboard = [];
addEventListener('keydown', (e) => {
  keyboard[e.code] = true;
});
addEventListener('keyup', (e) => {
  keyboard[e.code] = false;
});

const processKeyboard = (delta) => {
  let velocity = 0.2;
  let actVelocity = velocity * delta * 20;
  if (keyboard['KeyW']) {
    controls.moveForward(actVelocity);
  }
  if (keyboard['KeyS']) {
    controls.moveForward(-actVelocity);
  }
  if (keyboard['KeyA']) {
    controls.moveRight(-actVelocity);
  }
  if (keyboard['KeyD']) {
    controls.moveRight(actVelocity);
  }
}

// Lights
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(3, 10, 10);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 2;
dirLight.shadow.camera.bottom = - 2;
dirLight.shadow.camera.left = - 2;
dirLight.shadow.camera.right = 2;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 40;
scene.add(dirLight);

//welcome gate
let geo1 = new THREE.BoxGeometry(1, 0.6, 0.2);
let texture1 = new THREE.TextureLoader().load("./images/grafkom_welcome.png")
let matGeo1 = new THREE.MeshBasicMaterial({
  map: texture1
});

let mesh1 = new THREE.Mesh(geo1, matGeo1);
mesh1.position.set(3, -4, 2.25);
mesh1.receiveShadow = true;
mesh1.rotation.y = -10;
scene.add(mesh1);

let welcomeStick = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 64);
let matWelcome = new THREE.MeshBasicMaterial({
  color: 0xffffff
});
let meshWelcome = new THREE.Mesh(welcomeStick, matWelcome);
meshWelcome.position.set(3, -4.5, 2.25);
scene.add(meshWelcome);

// environment walls
// background assets from https://github.com/redeclipse/ulukai?files=1
let base = new THREE.BoxGeometry(1000, 1, 1000);
let floor = new THREE.TextureLoader().load("./images/corona_dn.png")
let matBase = new THREE.MeshBasicMaterial({
  map: floor
});
let meshBase = new THREE.Mesh(base, matBase);
meshBase.position.set(0, -5, 0);
scene.add(meshBase);

let base2 = new THREE.BoxGeometry(1000, 1, 1000);
let floor2 = new THREE.TextureLoader().load("./images/corona_dn.png")
let matBase2 = new THREE.MeshBasicMaterial({
  map: floor
});
let meshBase2 = new THREE.Mesh(base2, matBase2);
meshBase2.position.set(0, -10, 0);
scene.add(meshBase2);

let sky1 = new THREE.BoxGeometry(1000, 1, 1000);
let wall = new THREE.TextureLoader().load("./images/corona_up.png")
let matSky1 = new THREE.MeshBasicMaterial({
  map: wall
});
let meshSky1 = new THREE.Mesh(sky1, matSky1);
meshSky1.position.set(0, 500, 0);
scene.add(meshSky1);

let sky2 = new THREE.BoxGeometry(1, 1000, 1000);
let wall2 = new THREE.TextureLoader().load("./images/corona_bk.png")
let matSky2 = new THREE.MeshBasicMaterial({
  map: wall2
});
let meshSky2 = new THREE.Mesh(sky2, matSky2);
meshSky2.position.set(-500, 1, 0);
scene.add(meshSky2);

let sky3 = new THREE.BoxGeometry(1000, 1000, 1);
let wall3 = new THREE.TextureLoader().load("./images/corona_rt.png")
let matSky3 = new THREE.MeshBasicMaterial({
  map: wall3
});
let meshSky3 = new THREE.Mesh(sky3, matSky3);
meshSky3.position.set(0, 1, -500);
scene.add(meshSky3);

let sky4 = new THREE.BoxGeometry(1000, 1000, 1);
let wall4 = new THREE.TextureLoader().load("./images/corona_lf.png")
let matSky4 = new THREE.MeshBasicMaterial({
  map: wall4
});
let meshSky4 = new THREE.Mesh(sky4, matSky4);
meshSky4.position.set(0, 1, 500);
scene.add(meshSky4);

let sky5 = new THREE.BoxGeometry(1, 1000, 1000);
let wall5 = new THREE.TextureLoader().load("./images/corona_ft.png")
let matSky5 = new THREE.MeshBasicMaterial({
  map: wall5
});
let meshSky5 = new THREE.Mesh(sky5, matSky5);
meshSky5.position.set(500, 1, 0);
scene.add(meshSky5);

// sekat
// sekat texture from https://id.pinterest.com/pin/301389400061606988/
let sekat1 = new THREE.BoxGeometry(4, 3.5, 0.2);
let txtSekat1 = new THREE.TextureLoader().load("./images/floor3.jpg")
let matSekat1 = new THREE.MeshBasicMaterial({
  map: txtSekat1
});

let meshSekat1 = new THREE.Mesh(sekat1, matSekat1);
meshSekat1.position.set(4, -3.5, -1.5);
meshSekat1.receiveShadow = true;
meshSekat1.rotation.y = -10;
scene.add(meshSekat1);

let sekat2 = new THREE.BoxGeometry(4, 3.5, 0.2);
let txtSekat2 = new THREE.TextureLoader().load("./images/floor3.jpg")
let matSekat2 = new THREE.MeshBasicMaterial({
  map: txtSekat2
});

let meshSekat2 = new THREE.Mesh(sekat2, matSekat2);
meshSekat2.position.set(-4, -3.5, -1.5);
meshSekat2.receiveShadow = true;
meshSekat2.rotation.y = 10;
scene.add(meshSekat2);

let video1 = document.getElementById('video1');
video1.src = "./videos/vid1.mp4";

let video1Texture = new THREE.VideoTexture(video1);
let isiKiri2 = new THREE.BoxGeometry(2, 1.5, 0.1);
let matKiri2 = new THREE.MeshBasicMaterial({
  map: video1Texture
});

let meshKiri2 = new THREE.Mesh(isiKiri2, matKiri2);
meshKiri2.position.set(-4, -3, -1.75);
meshKiri2.receiveShadow = true;
meshKiri2.rotation.y = 10;
scene.add(meshKiri2);
video1.loop = true;
video1.play();

let sekat3 = new THREE.BoxGeometry(6, 3.5, 0.2);
let txtSekat3 = new THREE.TextureLoader().load("./images/floor3.jpg")
let matSekat3 = new THREE.MeshBasicMaterial({
  map: txtSekat3
});

let meshSekat3 = new THREE.Mesh(sekat3, matSekat3);
meshSekat3.position.set(6, -3.5, -7);
meshSekat3.receiveShadow = true;
meshSekat3.rotation.y = -10;
scene.add(meshSekat3);

let isiKanan3 = new THREE.BoxGeometry(1.5, 1.5, 0.1);
let txtKanan3 = new THREE.TextureLoader().load("./images/esel.png")
let matKanan3 = new THREE.MeshBasicMaterial({
  map: txtKanan3
});

let meshKanan3 = new THREE.Mesh(isiKanan3, matKanan3);
meshKanan3.position.set(6, -3, -7.25);
meshKanan3.receiveShadow = true;
meshKanan3.rotation.y = -10;
scene.add(meshKanan3);

let video3 = document.getElementById('video3');
video3.src = "./videos/vid3.mp4";

let video3Texture = new THREE.VideoTexture(video3);
let isiKanan1 = new THREE.BoxGeometry(2, 1.5, 0.1);
let matKanan1 = new THREE.MeshBasicMaterial({
  map: video3Texture
});

let meshKanan1 = new THREE.Mesh(isiKanan1, matKanan1);
meshKanan1.position.set(5.5, -3, -7.25);
meshKanan1.receiveShadow = true;
meshKanan1.rotation.y = -10;
scene.add(meshKanan1);
video3.loop = true;
video3.play();

let sekat4 = new THREE.BoxGeometry(6, 3.5, 0.2);
let txtSekat4 = new THREE.TextureLoader().load("./images/floor3.jpg")
let matSekat4 = new THREE.MeshBasicMaterial({
  map: txtSekat4
});

let meshSekat4 = new THREE.Mesh(sekat4, matSekat4);
meshSekat4.position.set(-6, -3.5, -7);
meshSekat4.receiveShadow = true;
meshSekat4.rotation.y = 10;
scene.add(meshSekat4);


let isiKiri4 = new THREE.BoxGeometry(1.5, 1.5, 0.1);
let txtKiri4 = new THREE.TextureLoader().load("./images/Robo1.png")
let matKiri4 = new THREE.MeshBasicMaterial({
  map: txtKiri4
});

let meshKiri4 = new THREE.Mesh(isiKiri4, matKiri4);
meshKiri4.position.set(-6, -3, -7.25);
meshKiri4.receiveShadow = true;
meshKiri4.rotation.y = 10;
scene.add(meshKiri4);

let video2 = document.getElementById('video2');
video2.src = "./videos/vid2.mp4";

let video2Texture = new THREE.VideoTexture(video2);
let isiKiri3 = new THREE.BoxGeometry(3, 1.5, 0.1);
let matKiri3 = new THREE.MeshBasicMaterial({
  map: video2Texture
});

let meshKiri3 = new THREE.Mesh(isiKiri3, matKiri3);
meshKiri3.position.set(-5.5, -3, -7.25);
meshKiri3.receiveShadow = true;
meshKiri3.rotation.y = 10;
scene.add(meshKiri3);
video2.loop = true;
video2.play();


let sekat5 = new THREE.BoxGeometry(8, 3.5, 0.2);
let txtSekat5 = new THREE.TextureLoader().load("./images/floor3.jpg")
let matSekat5 = new THREE.MeshBasicMaterial({
  map: txtSekat5
});

let meshSekat5 = new THREE.Mesh(sekat5, matSekat5);
meshSekat5.position.set(8, -3.5, -22.5);
meshSekat5.receiveShadow = true;
meshSekat5.rotation.y = -10;
scene.add(meshSekat5);

let sekat6 = new THREE.BoxGeometry(8, 3.5, 0.2);
let txtSekat6 = new THREE.TextureLoader().load("./images/floor3.jpg")
let matSekat6 = new THREE.MeshBasicMaterial({
  map: txtSekat6
});

let meshSekat6 = new THREE.Mesh(sekat6, matSekat6);
meshSekat6.position.set(-8, -3.5, -22.5);
meshSekat6.receiveShadow = true;
meshSekat6.rotation.y = 10;
scene.add(meshSekat6);

let sekat7 = new THREE.BoxGeometry(10, 3.5, 0.2);
let txtSekat7 = new THREE.TextureLoader().load("./images/podium3.jpg")
let matSekat7 = new THREE.MeshBasicMaterial({
  map: txtSekat7
});


let meshSekat7 = new THREE.Mesh(sekat7, matSekat7);
meshSekat7.position.set(0, -3.5, -25);
meshSekat7.receiveShadow = true;
scene.add(meshSekat7);

let video4 = document.getElementById('video4');
video4.src = "./videos/clock_uts.mp4";

let video4Texture = new THREE.VideoTexture(video4);
let isiBack = new THREE.BoxGeometry(2, 2, 0.1);
let matBack = new THREE.MeshBasicMaterial({
  map: video4Texture
});

let meshBack = new THREE.Mesh(isiBack, matBack);
meshBack.position.set(0, -3, -24.75);
meshBack.receiveShadow = true;
scene.add(meshBack);
video4.loop = true;
video4.play();

let sekat8 = new THREE.BoxGeometry(6, 3.5, 0.2);
let txtSekat8 = new THREE.TextureLoader().load("./images/floor3.jpg")
let matSekat8 = new THREE.MeshBasicMaterial({
  map: txtSekat8
});

let meshSekat8 = new THREE.Mesh(sekat8, matSekat8);
meshSekat8.position.set(7, -3.5, -3);
meshSekat8.receiveShadow = true;
meshSekat8.rotation.y = 20;
scene.add(meshSekat8);

let isiKanan2 = new THREE.BoxGeometry(3, 1.5, 0.1);
let txtKanan2 = new THREE.TextureLoader().load("./images/esel1.jpeg")
let matKanan2 = new THREE.MeshBasicMaterial({
  map: txtKanan2
});

let meshKanan2 = new THREE.Mesh(isiKanan2, matKanan2);
meshKanan2.position.set(6.5, -3, -3);
meshKanan2.receiveShadow = true;
meshKanan2.rotation.y = 20;
scene.add(meshKanan2);

let sekat9 = new THREE.BoxGeometry(6, 3.5, 0.2);
let txtSekat9 = new THREE.TextureLoader().load("./images/floor3.jpg")
let matSekat9 = new THREE.MeshBasicMaterial({
  map: txtSekat9
});

let meshSekat9 = new THREE.Mesh(sekat9, matSekat9);
meshSekat9.position.set(-7, -3.5, -3);
meshSekat9.receiveShadow = true;
meshSekat9.rotation.y = -20;
scene.add(meshSekat9);

let isiKiri1 = new THREE.BoxGeometry(3, 1.5, 0.1);
let txtKiri1 = new THREE.TextureLoader().load("./images/mawar1.png")
let matKiri1 = new THREE.MeshBasicMaterial({
  map: txtKiri1
});

let meshKiri1 = new THREE.Mesh(isiKiri1, matKiri1);
meshKiri1.position.set(-6.5, -3, -3);
meshKiri1.receiveShadow = true;
meshKiri1.rotation.y = -20;
scene.add(meshKiri1);

let sekat10 = new THREE.BoxGeometry(15.25, 3.5, 0.2);
let txtSekat10 = new THREE.TextureLoader().load("./images/floor3.jpg")
let matSekat10 = new THREE.MeshBasicMaterial({
  map: txtSekat10
});

let meshSekat10 = new THREE.Mesh(sekat10, matSekat10);
meshSekat10.position.set(-10, -3.5, -13);
meshSekat10.receiveShadow = true;
meshSekat10.rotation.y = -1.37;
scene.add(meshSekat10);


let sekat11 = new THREE.BoxGeometry(15.25, 3.5, 0.2);
let txtSekat11 = new THREE.TextureLoader().load("./images/floor3.jpg")
let matSekat11 = new THREE.MeshBasicMaterial({
  map: txtSekat11
});

let meshSekat11 = new THREE.Mesh(sekat11, matSekat11);
meshSekat11.position.set(10, -3.5, -13);
meshSekat11.receiveShadow = true;
meshSekat11.rotation.y = 1.37;
scene.add(meshSekat11);

let isiKanan4 = new THREE.BoxGeometry(1.5, 1.5, 0.1);
let txtKanan4 = new THREE.TextureLoader().load("./images/princess.png")
let matKanan4 = new THREE.MeshBasicMaterial({
  map: txtKanan4
});

let meshKanan4 = new THREE.Mesh(isiKanan4, matKanan4);
meshKanan4.position.set(9.5, -3, -11);
meshKanan4.receiveShadow = true;
meshKanan4.rotation.y = 1.37;
scene.add(meshKanan4);

let isiKiri5 = new THREE.BoxGeometry(1.5, 1.5, 0.1);
let txtKiri5 = new THREE.TextureLoader().load("./images/monster2.png")
let matKiri5 = new THREE.MeshBasicMaterial({
  map: txtKiri5
});

let meshKiri5 = new THREE.Mesh(isiKiri5, matKiri5);
meshKiri5.position.set(9.5, -3, -14);
meshKiri5.receiveShadow = true;
meshKiri5.rotation.y = 1.37;
scene.add(meshKiri5);


let isiKanan5 = new THREE.BoxGeometry(1.5, 1.5, 0.1);
let txtKanan5 = new THREE.TextureLoader().load("./images/noli_almet.png")
let matKanan5 = new THREE.MeshBasicMaterial({
  map: txtKanan5
});

let meshKanan5 = new THREE.Mesh(isiKanan5, matKanan5);
meshKanan5.position.set(-9.5, -3, -14);
meshKanan5.receiveShadow = true;
meshKanan5.rotation.y = -1.37;
scene.add(meshKanan5);

let isiKiri6 = new THREE.BoxGeometry(1.5, 1.5, 0.1);
let txtKiri6 = new THREE.TextureLoader().load("./images/nobo_1.png")
let matKiri6 = new THREE.MeshBasicMaterial({
  map: txtKiri6
});

let meshKiri6 = new THREE.Mesh(isiKiri6, matKiri6);
meshKiri6.position.set(-9.5, -3, -11);
meshKiri6.receiveShadow = true;
meshKiri6.rotation.y = -1.37;
scene.add(meshKiri6);

// model loader
// bench 3D model from https://plaggy.sellfy.store/p/cc0-bench-3d/
const bench = new THREE.GLTFLoader().load("./model/glTF/scene.gltf", function (result) {
  result.scene.position.set(1.5, -4.25, -24);
  scene.add(result.scene);
}, onprogress, onerror, onload);
const bench2 = new THREE.GLTFLoader().load("./model/glTF/scene.gltf", function (result) {
  result.scene.position.set(-1.5, -4.25, -24);
  scene.add(result.scene);
}, onprogress, onerror, onload);
const bench3 = new THREE.GLTFLoader().load("./model/glTF/scene.gltf", function (result) {
  result.scene.position.set(-6, -4.25, 1);
  scene.add(result.scene);
}, onprogress, onerror, onload);
const bench4 = new THREE.GLTFLoader().load("./model/glTF/scene.gltf", function (result) {
  result.scene.position.set(6, -4.25, 1);
  scene.add(result.scene);
}, onprogress, onerror, onload);

// globe 3d model is based on "Latitude and longitude (low poly)" 
// (https://sketchfab.com/3d-models/latitude-and-longitude-low-poly-005e6a893d984538a7caee0cd403e0c6) 
// by famousandfaded (https://sketchfab.com/famousandfaded) 
// licensed under CC-BY-SA-4.0 (http://creativecommons.org/licenses/by-sa/4.0/)
const globe = new THREE.GLTFLoader().load("./model/earth3D/earth.gltf", function (result) {
  result.scene.position.set(0, -2.5, -15);
  result.scene.scale.x = 8;
  result.scene.scale.y = 8;
  result.scene.scale.z = 8;
  scene.add(result.scene);
}, onprogress, onerror, onload);

// green tree 3d model is based on https://www.cgtrader.com/items/2695949/download-page
const tree2 = new THREE.GLTFLoader().load("./model/tree2.glb", function (result) {
  result.scene.position.set(-3, -4.25, 3);
  scene.add(result.scene);
}, onprogress, onerror);

// white trees 3d model is based on https://www.cgtrader.com/items/3166032/download-page
const tree3 = new THREE.GLTFLoader().load("./model/tree3.glb", function (result) {
  result.scene.position.set(0, -4.25, -50);
  scene.add(result.scene);
}, onprogress, onerror);
const tree4 = new THREE.GLTFLoader().load("./model/tree3.glb", function (result) {
  result.scene.position.set(-50, -4.25, -50);
  scene.add(result.scene);
}, onprogress, onerror);
const tree5 = new THREE.GLTFLoader().load("./model/tree3.glb", function (result) {
  result.scene.position.set(50, -4.25, -50);
  scene.add(result.scene);
}, onprogress, onerror);

// back of camera
const tree6 = new THREE.GLTFLoader().load("./model/tree3.glb", function (result) {
  result.scene.position.set(0, -4.25, 50);
  scene.add(result.scene);
}, onprogress, onerror);

const backBench1 = new THREE.GLTFLoader().load("./model/glTF/scene.gltf", function (result) {
  result.scene.position.set(0, -4.25, 40);
  scene.add(result.scene);
}, onprogress, onerror, onload);

const tree7 = new THREE.GLTFLoader().load("./model/tree3.glb", function (result) {
  result.scene.position.set(-50, -4.25, 50);
  scene.add(result.scene);
}, onprogress, onerror);

const backBench2 = new THREE.GLTFLoader().load("./model/glTF/scene.gltf", function (result) {
  result.scene.position.set(-50, -4.25, 40);
  scene.add(result.scene);
}, onprogress, onerror, onload);

const tree8 = new THREE.GLTFLoader().load("./model/tree3.glb", function (result) {
  result.scene.position.set(50, -4.25, 50);
  scene.add(result.scene);
}, onprogress, onerror);

const backBench3 = new THREE.GLTFLoader().load("./model/glTF/scene.gltf", function (result) {
  result.scene.position.set(50, -4.25, 40);
  scene.add(result.scene);
}, onprogress, onerror, onload);

const geoSaya = new THREE.BufferGeometry();
let verts = new Float32Array([
  -1.0, -1.0, 1.0, //0
  -1.0, 1.0, 1.0, //1
  -0.5, 1.0, 1.0, //2
  0.0, 0.25, 1.0, //3
  0.5, 1.0, 1.0, //4
  1.0, 1.0, 1.0, //5
  1.0, -1.0, 1.0, //6
  0.5, -1.0, 1.0, //7
  0.5, 0.25, 1, //8
  0.0, -0.5, 1.0, //9
  -0.5, 0.25, 1.0, //10
  -0.5, -1.0, 1.0, //11

  -1.0, -1.0, 0.5, //12
  -1.0, 1.0, 0.5, //13
  -0.5, 1.0, 0.5, //14
  0.0, 0.25, 0.5, //15
  0.5, 1.0, 0.5, //16
  1.0, 1.0, 0.5, //17
  1.0, -1.0, 0.5, //18
  0.5, -1.0, 0.5, //19
  0.5, 0.25, 0.5, //20
  0.0, -0.5, 0.5, //21
  -0.5, 0.25, 0.5, //22
  -0.5, -1.0, 0.5, //23

])

let colors = new Float32Array([
  0.0, 1.0, 1.0,
  0.0, 1.0, 1.0,
  0.0, 1.0, 1.0,
  0.0, 1.0, 1.0,
  0.0, 1.0, 1.0,
  0.0, 1.0, 1.0,
  0.0, 1.0, 1.0,
  0.0, 1.0, 1.0,
  0.0, 1.0, 1.0,
  0.0, 1.0, 1.0,
  0.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
]);
geoSaya.setAttribute('position', new THREE.BufferAttribute(verts, 3));
geoSaya.setAttribute('color', new THREE.BufferAttribute(colors, 3));
geoSaya.setIndex([
  //depan
  0, 2, 1,
  0, 11, 2,
  10, 3, 2,
  10, 9, 3,
  3, 9, 8,
  3, 8, 4,
  4, 6, 5,
  7, 6, 4,

  //belakang
  12, 13, 14,
  12, 14, 23,
  22, 14, 15,
  22, 15, 21,
  21, 15, 20,
  20, 15, 16,
  16, 17, 18,
  19, 16, 18,

  //kiri
  12, 0, 1,
  12, 1, 13,
  19, 7, 8,
  8, 20, 19,

  //kanan
  17, 5, 18,
  5, 6, 18,
  22, 10, 11,
  11, 23, 22,

  //atas
  5, 16, 4,
  5, 17, 16,
  2, 13, 1,
  2, 14, 13,
  14, 2, 3,
  3, 15, 14,
  16, 15, 4,
  15, 3, 4,

  //bawah
  0, 12, 11,
  11, 12, 23,
  7, 19, 6,
  6, 19, 18,
  10, 22, 9,
  9, 22, 21,
  9, 20, 8,
  9, 21, 20,

])
const myMat = new THREE.MeshBasicMaterial({
  vertexColors: THREE.VertexColors,
  vertexColors: true
});
let myMesh = new THREE.Mesh(geoSaya, myMat);
myMesh.position.set(-3.5, -3, 0);
scene.add(myMesh);

let geoPodium = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 64);
let podium1 = new THREE.TextureLoader().load("./images/podium3.jpg")
let matPodium = new THREE.MeshBasicMaterial({
  map: podium1,
  // color: 0x000000
});
let meshPodium = new THREE.Mesh(geoPodium, matPodium);
meshPodium.position.set(-3.5, -4.25, 0);
meshPodium.castShadow = true;
scene.add(meshPodium);

const geo_saya = new THREE.BufferGeometry();
let colorss = new Float32Array([
  1.0, 0.0, 0.0,//vertex 0
  1.0, 0.0, 0.0,//vertex 0
  1.0, 0.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,//vertex 4
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,

  1.0, 0.0, 0.0,//vertex 0
  1.0, 0.0, 0.0,//vertex 0
  1.0, 0.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,//vertex 4
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,

  1.0, 0.0, 0.0,//vertex 0
  1.0, 0.0, 0.0,//vertex 0
  1.0, 0.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,//vertex 4
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,

])
let vertices = new Float32Array([
  -1.0, -1.0, 0.0,//0
  1.0, 1.0, 0.0,//1
  -1.0, 1.0, 0.0,//2
  1.0, -0.8, 0.0,//3
  -1.0, -2.0, 0.0,//4
  -0.4, 0.4, 0.0,//5
  1.0, 0.4, 0.0,//6
  -0.4, -0.2, 0.0,//7
  1.0, -0.2, 0.0,//8
  1.0, -4.0, 0.0,//9 //gadipake
  -0.4, -0.8, 0.0,//10
  1.0, -1.4, 0.0,//11
  -0.4, -1.4, 0.0,//12
  1.0, -2.0, 0.0,//13
  -0.4, -2.0, 0.0,//14


  1.0, 1.0, -0.7,//15
  -1.0, 1.0, -0.7,//16
  1.0, -0.8, -0.7,//17
  -1.0, -2.0, -0.7,//18
  -0.4, 0.4, -0.7,//29
  1.0, 0.4, -0.7,//20
  -0.4, -0.2, -0.7,//21
  1.0, -0.2, -0.7,//22
  1.0, -4.0, -0.7,//23 // gadipake
  -0.4, -0.8, -0.7,//24
  1.0, -1.4, -0.7,//25
  -0.4, -1.4, -0.7,//26
  1.0, -2.0, -0.7,//27
  -0.4, -2.0, -0.7,//28
  -1.0, -1.4, -0.7,//29

]);
geo_saya.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geo_saya.setAttribute('color', new THREE.BufferAttribute(colorss, 3));
geo_saya.setIndex([

  //sisi depan
  6, 1, 2,
  5, 6, 1,
  2, 4, 5,
  2, 5, 1,
  10, 8, 7,
  10, 3, 8,
  4, 14, 5,
  4, 13, 12,
  13, 11, 12,

  //sisi belakang

  16, 15, 20,
  19, 16, 20,
  28, 18, 16,
  19, 18, 16,
  16, 20, 19,
  17, 21, 22,
  24, 21, 17,
  18, 29, 19,
  20, 19, 16,
  26, 25, 27,
  26, 25, 28,
  19, 26, 16,

  //samping luar
  16, 4, 2,
  4, 16, 18,
  1, 20, 15,
  1, 6, 20,
  22, 8, 17,
  22, 3, 17,
  8, 3, 17,
  11, 13, 27,
  11, 27, 25,

  //dalam
  18, 16, 29,
  10, 12, 26,
  10, 26, 24,
  11, 26, 12,
  11, 27, 25,
  7, 21, 5,
  21, 19, 5,
  21, 7, 8,
  8, 22, 21,
  5, 19, 6,
  19, 20, 6,
  17, 3, 10,
  17, 3, 24,
  3, 10, 24,
  25, 26, 11,

  //atasbawah
  16, 2, 1,
  16, 1, 15,
  28, 13, 4,
  28, 4, 18,
  28, 27, 13,


]);

const mat_saya = new THREE.MeshBasicMaterial({
  vertexColors: THREE.VertexColors,
  vertexColors: true
});
let mesh_saya = new THREE.Mesh(geo_saya, mat_saya);
mesh_saya.position.set(3.5, -2, -0.25);
scene.add(mesh_saya);

let geoPodium2 = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 64);
let podium2 = new THREE.TextureLoader().load("./images/podium3.jpg")
let matPodium2 = new THREE.MeshBasicMaterial({
  map: podium1,
});
let meshPodium2 = new THREE.Mesh(geoPodium2, matPodium2);
meshPodium2.position.set(3.5, -4.25, 0);
meshPodium2.castShadow = true;
scene.add(meshPodium2);

window.addEventListener('resize', function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  cam.aspect = width / height;
  cam.updateProjectionMatrix();
});

function draw() {
  let delta = clock.getDelta();
  myMesh.rotation.y += 0.01;
  mesh_saya.rotation.y += 0.01;
  renderer.render(scene, cam);
  processKeyboard(delta);
  requestAnimationFrame(draw);
}

draw();