import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// ----- 주제: PointerLockControls에 키보드 컨트롤 추가

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	let boxMaterial = new THREE.MeshStandardMaterial({
		color: `rgb(
			${ 50 + Math.floor(Math.random() * 205) },
			${ 50 + Math.floor(Math.random() * 205) },
			${ 50 + Math.floor(Math.random() * 205) }
		)`
	});

	//dat
	// const gui = new dat.GUI();

	// Mesh
	const geometry = new THREE.BoxGeometry(10, 0.1, 10);
	let mesh;
	let material;
	material = new THREE.MeshStandardMaterial({
		color: `rgb(
			${ 50 + Math.floor(Math.random() * 205) },
			${ 50 + Math.floor(Math.random() * 205) },
			${ 50 + Math.floor(Math.random() * 205) }
		)`
	});
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = 0;
	mesh.position.y = 0;
	mesh.position.z = 0;
	scene.add(mesh);


	// gltf loader
	const gltfLoader = new GLTFLoader();
	let namuMesh;
	
	gltfLoader.load(
		'./models/alien_01.glb',
		gltf => {
			console.log(gltf.scene.children)
			namuMesh = gltf.scene.children[0];
			// namuGeoMetry = gltf.scene.children[0].geometry;
			// 색상을 가진 머티리얼 생성
			scene.add(namuMesh);
		}
	);


	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();
		
		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
