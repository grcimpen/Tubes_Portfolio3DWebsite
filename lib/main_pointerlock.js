let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
let renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.domElement.id = "canvas";
document.body.appendChild(renderer.domElement);

// cam.position.set(75, 20, 0)
cam.position.set(0, 0, 5);

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
  btn.innerHTML = "unlocked";
})


let keyboard = [];
addEventListener('keydown', (e) => {
  keyboard[e.code] = true;
});
addEventListener('keyup', (e) => {
  keyboard[e.code] = false;
});

const processKeyboard = (delta) => {
  let velocity = 0.2;
  let actVelocity = velocity * delta * 10;
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
  // if (keyboard['Space']) {
  //   let jump = controls.getObject().position.y += actVelocity;
  //   jump;
  // }
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


let geo1 = new THREE.BoxGeometry(1, 1, 1);
let mat1 = new THREE.MeshStandardMaterial({
  color: 0x8C92AC,
  wireframe: false,
});
let mesh1 = new THREE.Mesh(geo1, mat1);
scene.add(mesh1);


let base = new THREE.BoxGeometry(1000, 1, 1000);
let floor = new THREE.TextureLoader().load("./images/ground.jpg")
let matBase = new THREE.MeshBasicMaterial({
  map: floor
});
let meshBase = new THREE.Mesh(base, matBase);
meshBase.position.set(0, -5, 0);
scene.add(meshBase);


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

// const house1 = new THREE.OBJLoader().load("./model/Farm_house.obj", function (result) {
//   console.log(result, "result");
//   result.scale.x = -5;
//   result.scale.y = -5;
//   result.scale.z = -5;
//   scene.add(result.children[0]);
//   // scene.add(result.scene.children[2]);
// })


window.addEventListener('resize', function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  cam.aspect = width / height;
  cam.updateProjectionMatrix();
});

function draw() {
  let delta = clock.getDelta();
  // console.log(cam.position);
  processKeyboard(delta);
  requestAnimationFrame(draw);
  renderer.render(scene, cam);
}

draw();