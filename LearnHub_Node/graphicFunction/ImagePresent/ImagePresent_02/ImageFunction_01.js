import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PreventDragClick } from './PreventDragClick';

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
	camera.position.y = 5;
	camera.position.z = 7;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	// const controls = new PointerLockControls(camera, renderer.domElement);
	const controls = new OrbitControls(camera, renderer.domElement);


	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	let boxMaterial = new THREE.MeshStandardMaterial({
		color: `rgb(
			${ 50 + Math.floor(Math.random() * 205) },
			${ 50 + Math.floor(Math.random() * 205) },
			${ 50 + Math.floor(Math.random() * 205) }
		)`
	});


	// Mesh
	const geometry = new THREE.BoxGeometry(10, 0.1, 10);
	let mesh;
	let badacMaterial;

	badacMaterial = new THREE.MeshStandardMaterial({
		color: `rgb(100,150,100)`	
	});

	mesh = new THREE.Mesh(geometry, badacMaterial);
	mesh.position.x = 0;
	mesh.position.y = 0;
	mesh.position.z = 0;
	scene.add(mesh);

	// gltf loader
	const gltfLoader = new GLTFLoader();
	let namuMesh;
	let namuIpMesh;
	let apple1Mesh;
	let apple2Mesh;
	let apple3Mesh;
	let apple4Mesh;

	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();


	gltfLoader.load(
		'./models/namu.glb',
		gltf => {
			console.log(gltf.scene.children)
			namuMesh = gltf.scene.children[0];
			// namuGeoMetry = gltf.scene.children[0].geometry;
			// 색상을 가진 머티리얼 생성
			scene.add(namuMesh);
		}
	);
	gltfLoader.load(
		'./models/namuip.glb',
		gltf => {
			namuIpMesh = gltf.scene.children[0];
			// namuGeoMetry = gltf.scene.children[0].geometry;
			// 색상을 가진 머티리얼 생성
			scene.add(namuIpMesh);
		}
	);
	gltfLoader.load(
		'./models/apple1.glb',
		gltf => {
			apple1Mesh = gltf.scene.children[0];
			// namuGeoMetry = gltf.scene.children[0].geometry;
			// 색상을 가진 머티리얼 생성
			scene.add(apple1Mesh);
		}
	);
	gltfLoader.load(
		'./models/apple2.glb',
		gltf => {
			apple2Mesh = gltf.scene.children[0];
			// namuGeoMetry = gltf.scene.children[0].geometry;
			// 색상을 가진 머티리얼 생성
			scene.add(apple2Mesh);
		}
	);
	gltfLoader.load(
		'./models/apple3.glb',
		gltf => {
			apple3Mesh = gltf.scene.children[0];
			// namuGeoMetry = gltf.scene.children[0].geometry;
			// 색상을 가진 머티리얼 생성
			scene.add(apple3Mesh);
		}
	);
	gltfLoader.load(
		'./models/apple4.glb',
		gltf => {
			apple4Mesh = gltf.scene.children[0];
			// namuGeoMetry = gltf.scene.children[0].geometry;
			// 색상을 가진 머티리얼 생성
			scene.add(apple4Mesh);
		}
	);

	// 그리기
	const clock = new THREE.Clock();
		
	function draw() {
		const delta = clock.getDelta();
		
		const treeColorHex = 0x8B4513; // 나무색
		const treeColorHexMat = new THREE.MeshStandardMaterial({ color: treeColorHex });

		const treeIpColorHex = 0x008000; // 나뭇잎색
		const treeIpColorHexMat = new THREE.MeshStandardMaterial({ color: treeIpColorHex });

		const appleRed = 255; // 빨강(Red) 채널 값
		const appleGreen = 0; // 녹색(Green) 채널 값
		const appleBlue = 0; // 파랑(Blue) 채널 값
		
		// RGB 값을 계산하여 정수로 표현
		const appleColorInt = (appleRed << 16) + (appleGreen << 8) + appleBlue;
		
		// 정수로 표현된 색상을 이용하여 머티리얼 생성
		const appleColorIntMat = new THREE.MeshStandardMaterial({ color: appleColorInt });
		

		if(namuMesh && namuMesh.material) {
			namuMesh.material = treeColorHexMat;
		}
		if(namuIpMesh && namuIpMesh.material) {
			namuIpMesh.material = treeIpColorHexMat;
		}
		if(apple1Mesh && apple1Mesh.material) {
			apple1Mesh.material = appleColorIntMat;
		}
		if(apple2Mesh && apple2Mesh.material) {
			apple2Mesh.material = appleColorIntMat;
		}
		if(apple3Mesh && apple3Mesh.material) {
			apple3Mesh.material = appleColorIntMat;
		}
		if(apple4Mesh && apple4Mesh.material) {
			// apple4Mesh.material = appleColorIntMat;
		}

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function checkIntersects() {
		console.log(preventDragClick.mouseMoved);
		if (preventDragClick.mouseMoved) return;

		raycaster.setFromCamera(mouse, camera);

		let meshes = [namuMesh, namuIpMesh, apple1Mesh, apple2Mesh, apple3Mesh, apple4Mesh];
		const intersects = raycaster.intersectObjects(meshes);
		for (const item of intersects) {
			console.log(item.object.name);
			// item.object.material.color.set('red');
			const treeColorHex = 0x8B4513; // 나무색
			const treeColorHexMat = new THREE.MeshStandardMaterial({ color: treeColorHex });
	
			item.object.material = treeColorHexMat;
			break;
		}
		// if (intersects[0]) {
		// 	intersects[0].object.material.color.set('blue');
		// }
	}


	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);
	canvas.addEventListener('click', e => {
		mouse.x = e.clientX / canvas.clientWidth * 2 - 1;
		mouse.y = -(e.clientY / canvas.clientHeight * 2 - 1);
		// console.log(mouse);
		checkIntersects();
	});

	const preventDragClick = new PreventDragClick(canvas);

	draw();
}
