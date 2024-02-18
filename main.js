import * as THREE from 'three';
import './styles.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

//Scene
const scene = new THREE.Scene();

//Create obj
const geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({color: "#00ff83"});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};


//Light
const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(0, 10, 10);
scene.add(light);

//Camera

const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height);
camera.position.z = 10;
scene.add(camera);

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(5);
renderer.render(scene, camera);

//Controls 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan =false;
controls.enableZoom = false;
controls.enableRotate = true;
controls.autoRotateSpeed = -1;
controls.autoRotate = true;

//Resizing
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
})



const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}

loop();


//timelines
const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(mesh.position, {x: -10}, {x: 0});