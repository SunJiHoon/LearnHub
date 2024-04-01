import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: OrbitControls

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

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
	controls.enableDamping = true;

	// Mesh
	const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
	
	// Get the input element and button element
	const objectCountInput = document.getElementById('object-count');
	const generateObjectsButton = document.getElementById('generate-objects-button');
	const clearButton = document.getElementById('generate-objects-clearButton');
	const fx_function = document.getElementById('fx_function');
	const x_start = document.getElementById('x_start');
	const x_end = document.getElementById('x_end');

	const fy_function = document.getElementById('fy_function');
	const y_start = document.getElementById('y_start');
	const y_end = document.getElementById('y_end');

	function parseAndCreateFunction(expression) {
    	// 'return' 키워드를 추가하여 함수를 생성합니다.
    	return new Function('x', 'return ' + expression);
	}

	function handleClearButtonClick() {
    	const meshesToRemove = [];
    	scene.children.forEach(child => {
        	if (child instanceof THREE.Mesh) {
            	meshesToRemove.push(child);
        	}
    	});

    	meshesToRemove.forEach(mesh => {
        	scene.remove(mesh);
    	});
	}

	// Add event listener to the button
	clearButton.addEventListener('click', handleClearButtonClick);


	// Add event listener to the button
	generateObjectsButton.addEventListener('click', () => {
		console.log(fx_function.value);
        // Remove existing objects from the scene
		handleClearButtonClick();
		const parsedFunction_fx_function = parseAndCreateFunction(fx_function.value);
		const parsedFunction_fy_function = parseAndCreateFunction(fy_function.value);

        // Generate objects based on the input number
		let di = 0.1;
		let dj = 0.1;
        for (let i = parseFloat(x_start.value); i < parseFloat(x_end.value); i += di) {
			for(let j = parseFloat(y_start.value); j < parseFloat(y_end.value); j+= dj){

				console.log(i);

				const geometry1 = new THREE.BufferGeometry();
				const vertices1 = new Float32Array([
					i, parsedFunction_fx_function(i) + parsedFunction_fy_function(j), j,  // 첫번째 점
					i + (di/2), parsedFunction_fx_function(i + (di/2)) + parsedFunction_fy_function(j +(dj/2)), j +(dj/2),  // 두번째 점
					i + di, parsedFunction_fx_function(i + di) + parsedFunction_fy_function(j), j, // 세번째 점
				]);
				geometry1.setAttribute('position', new THREE.BufferAttribute(vertices1, 3));
				
				const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }); // 양면 모두 표시하도록 side 설정
				const mesh1 = new THREE.Mesh(geometry1, material1);
				scene.add(mesh1);

				const geometry2 = new THREE.BufferGeometry();
				const vertices2 = new Float32Array([
					i + di, parsedFunction_fx_function(i + di) + parsedFunction_fy_function(j), j,  // 첫번째 점
					i + (di/2), parsedFunction_fx_function(i + (di/2)) + parsedFunction_fy_function(j +(dj/2)), j +(dj/2),  // 두번째 점
					i + di, parsedFunction_fx_function(i + di) + parsedFunction_fy_function(j + dj), j + dj, // 세번째 점
				]);
				geometry2.setAttribute('position', new THREE.BufferAttribute(vertices2, 3));
				
				const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }); // 양면 모두 표시하도록 side 설정
				const mesh2 = new THREE.Mesh(geometry2, material2);
				scene.add(mesh2);


				const geometry3 = new THREE.BufferGeometry();
				const vertices3 = new Float32Array([
					i + di, parsedFunction_fx_function(i + di) + parsedFunction_fy_function(j + dj), j + dj,  // 첫번째 점
					i + (di/2), parsedFunction_fx_function(i + (di/2)) + parsedFunction_fy_function(j +(dj/2)), j +(dj/2),  // 두번째 점
					i , parsedFunction_fx_function(i ) + parsedFunction_fy_function(j + dj), j + dj, // 세번째 점
				]);
				geometry3.setAttribute('position', new THREE.BufferAttribute(vertices3, 3));
				
				const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide }); // 양면 모두 표시하도록 side 설정
				const mesh3 = new THREE.Mesh(geometry3, material3);
				scene.add(mesh3);

				// const geometry4 = new THREE.BufferGeometry();
				// const vertices4 = new Float32Array([
				// 	i , parsedFunction_fx_function(i) + parsedFunction_fy_function(j + dj), j + dj,  // 첫번째 점
				// 	i + (di/2), parsedFunction_fx_function(i + (di/2)) + parsedFunction_fy_function(j +(dj/2)), j +(dj/2),  // 두번째 점
				// 	i , parsedFunction_fx_function(i) + parsedFunction_fy_function(j), j, // 세번째 점
				// ]);
				// geometry4.setAttribute('position', new THREE.BufferAttribute(vertices4, 3));
				
				// const material4 = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide }); // 양면 모두 표시하도록 side 설정
				// const mesh4 = new THREE.Mesh(geometry4, material4);
				// scene.add(mesh4);

				
			}
        }
	});


	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		controls.update();

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
