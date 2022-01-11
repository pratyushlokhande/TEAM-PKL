
let container, group, scene, camera, renderer, light;

function init() {
  // container = document.querySelector(".scene");
  scene = new THREE.Scene();

  scene.backfly_robot = new THREE.CubeTextureLoader()
    .setPath("skybox/")
    .load([
      "front.png",
      "back.png",
      "top.png",
      "bottom.png",
      "left.png",
      "right.png",
    ]);

  group = new THREE.Group();

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.set(0, 0, 9);
  let controls = new THREE.OrbitControls(camera, renderer.domElement);


  // Hemisphere light
  const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
  hemiLight.position.set(0, -10, 0);
  scene.add(hemiLight);
  
  // Hemisphere light
  const spotLightTwo = new THREE.SpotLight(0xffffff);
  spotLightTwo.position.set(100, 1000, 100);

  spotLightTwo.castShadow = true;

  spotLightTwo.shadow.mapSize.width = 1024;
  spotLightTwo.shadow.mapSize.height = 1024;

  spotLightTwo.shadow.camera.near = 500;
  spotLightTwo.shadow.camera.far = 4000;
  spotLightTwo.shadow.camera.fov = 30;

  scene.add(spotLightTwo);

  light = new THREE.SpotLight(0xffa95c, 2);
  light.position.set(0, 50, 50);
  light.castShadow = true;
  light.shadow.bias = -0.0001;
  light.shadow.mapSize.width = 1024 * 4;
  light.shadow.mapSize.height = 1024 * 4;
  scene.add(light);

  let gltfLoader = new THREE.GLTFLoader();
  gltfLoader.load("model/scene.gltf", function (gltf) {
    let samurai = gltf.scene.children[0];
    // robot.scale.set(0.1, 0.1, 0.1);
    samurai.position.set(0, -1.1, 1);
    samurai.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
        if (n.material.map) n.material.map.anisotropy = 16;
      }
    });
    group.add(samurai);
  });
  gltfLoader.load("model/robot/scene.gltf", function (gltf) {
    let robot = gltf.scene.children[0];
    robot.scale.set(0.0019, 0.0019, 0.0019);
    robot.position.set(2.5, 0.9, 2);
    robot.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
        if (n.material.map) n.material.map.anisotropy = 16;
      }
    });
    group.add(robot);
  });
  gltfLoader.load("model/fly_robot/scene.gltf", function (gltf) {
    let fly_robot = gltf.scene.children[0];
    fly_robot.scale.set(3, 3, 3);
    fly_robot.position.set(-2, 0.5, 1);
    fly_robot.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
        if (n.material.map) n.material.map.anisotropy = 16;
      }
    });
    group.add(fly_robot);
  });
  gltfLoader.load("model/friendlyRobot/scene.gltf", function (gltf) {
    let frobot = gltf.scene.children[0];
    // frobot.scale.set(2.1, 2.1, 2.1);
    frobot.position.set(-3, -1.4, 3);
    frobot.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
        if (n.material.map) n.material.map.anisotropy = 16;
      }
    });
    group.add(frobot);
  });
  gltfLoader.load("model/baby_robot/scene.gltf", function (gltf) {
    let brobot = gltf.scene.children[0];
    // console.log(brobot);
    brobot.scale.set(0.01, 0.01, 0.01);
    brobot.position.set(-1, -1.3, 3);
    brobot.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
        if (n.material.map) n.material.map.anisotropy = 16;
      }
    });
    group.add(brobot);
  });
  gltfLoader.load("model/broken_moon/scene.gltf", function (gltf) {
    let bmoon = gltf.scene.children[0];
    // console.log(brobot);
    bmoon.scale.set(0.5, 0.5, 0.5);
    bmoon.position.set(-3, 3, -5);
    bmoon.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
        if (n.material.map) n.material.map.anisotropy = 16;
      }
    });
    group.add(bmoon);
  });
  gltfLoader.load("model/moon/scene.gltf", function (gltf) {
    let moon = gltf.scene.children[0];
    // console.log(brobot);
    moon.scale.set(0.0015, 0.0015, 0.0015);
    moon.position.set(0, -1, 0);
    moon.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
        if (n.material.map) n.material.map.anisotropy = 16;
      }
    });
    group.add(moon);
  });

  scene.add(group);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;

  document.addEventListener("mousemove", (e) => {
    let mouseX = e.clientX - centerX;
    let mouseY = e.clientY - centerY;
    group.rotation.y = mouseX * 0.0001;
    group.rotation.x = mouseY * 0.0001;
  })
  light.position.set(
    camera.position.x + 10,
    camera.position.y + 10,
    camera.position.z + 10
  );

  // console.log(camera.position);
  renderer.render(scene, camera);
}


init();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
