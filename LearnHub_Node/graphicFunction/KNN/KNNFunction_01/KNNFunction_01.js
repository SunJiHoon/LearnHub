import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { KeyController } from './KeyController';
import { MouseController } from './MouseController';

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
	const controls = new PointerLockControls(camera, renderer.domElement);

	controls.domElement.addEventListener('mousedown', (event) => {
		if (event.button === 0) { // 0은 좌클릭 버튼을 나타냅니다. 1은 스크롤 휠, 2는 우클릭 버튼
			controls.lock();
		}
	});
	
	controls.addEventListener('lock', () => {
		console.log('lock!');
	});
	controls.addEventListener('unlock', () => {
		console.log('unlock!');
	});


	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	let boxMaterial = new THREE.MeshStandardMaterial({
		color: `rgb(
			${ 50 + Math.floor(Math.random() * 205) },
			${ 50 + Math.floor(Math.random() * 205) },
			${ 50 + Math.floor(Math.random() * 205) }
		)`
	});

	const mouseController = new MouseController(controls);

	// 마우스 컨트롤 
	function click(){
		if(mouseController.keys[0]){
			console.log("좌클릭");
		}
		if(mouseController.keys[1]){
			console.log("휠");
		}
		if(mouseController.keys[2]){
			console.log("우클릭");
			// 새로운 벡터를 생성합니다.
			var targetVector = new THREE.Vector3();
			// 카메라의 시선 방향 벡터를 가져옵니다.
			// var lookDirection = camera.getWorldDirection(targetVector);
			var lookDirection = controls.getDirection(targetVector);
			// 콘솔에 카메라의 시선 방향 벡터를 출력합니다.
			console.log("카메라의 시선 방향:", lookDirection);
			console.log("카메라의 현재 위치:", camera.position);
			let a = camera.position.x;
			let b = camera.position.y;
			let c = camera.position.z;
			
			let u1 = lookDirection.x;
			let u2 = lookDirection.y;
			let u3 = lookDirection.z;
	
			let setupX = ((0 - parseFloat(b)) / parseFloat(u2)) * parseFloat(u1) + parseFloat(a);
			let setupY = 0;
			let setupZ = ((0 - b) / u2) * u3 + c;
			let boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
			// console.log(setupX);
			// console.log(setupY);
			// console.log(setupZ);
			boxMesh.position.x = setupX;
			boxMesh.position.y = setupY;
			boxMesh.position.z = setupZ;
			scene.add(boxMesh);
		}
		
	}
	// 키보드 컨트롤
	const keyController = new KeyController();

	function walk() {
		if (keyController.keys['KeyW'] || keyController.keys['ArrowUp']) {
			controls.moveForward(0.02);
		}
		if (keyController.keys['KeyS'] || keyController.keys['ArrowDown']) {
			controls.moveForward(-0.02);
		}
		if (keyController.keys['KeyA'] || keyController.keys['ArrowLeft']) {
			controls.moveRight(-0.02);
		}
		if (keyController.keys['KeyD'] || keyController.keys['ArrowRight']) {
			controls.moveRight(0.02);
		}
		if (keyController.keys['Space']) {
   			// Space 키가 눌렸을 때 상승하는 동작 추가
			camera.position.y += 0.02; // 카메라의 y 좌표를 증가시킴
		}
		if (keyController.keys['ShiftLeft'] || keyController.keys['ShiftRight']) {
    		// Shift 키가 눌렸을 때 하강하는 동작 추가
    		camera.position.y -= 0.02; // 카메라의 y 좌표를 감소시킴
		}
		
	}


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

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();
		
		click();
		walk();

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
