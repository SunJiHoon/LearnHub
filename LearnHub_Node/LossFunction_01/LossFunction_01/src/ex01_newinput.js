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

	const dot_x = document.getElementById('dot_x');
	const dot_y = document.getElementById('dot_y');
	const dot_learning_rate = document.getElementById('dot_learning_rate');
	const generateDotButton = document.getElementById('generate-dot-button');
	const removeDotClearButton = document.getElementById('remove-dot-clearButton');


	function numericalDifferentiation(f, x, h = 0.0001) {
		return (f(x + h) - f(x)) / h;
	}
	
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
	function handleClearButtonClickSphere() {
		const meshesToRemove = [];
		scene.children.forEach(child => {
			if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
				// child가 Mesh이면서 geometry가 SphereGeometry인 경우에만 meshesToRemove 배열에 추가합니다.
				meshesToRemove.push(child);
			}
		});
	
		meshesToRemove.forEach(mesh => {
			scene.remove(mesh); // meshesToRemove 배열에 있는 모든 구를 scene에서 제거합니다.
		});
	}

	// Add event listener to the button
	clearButton.addEventListener('click', handleClearButtonClick);
	removeDotClearButton.addEventListener('click', handleClearButtonClickSphere);


	// Add event listener to the button
	generateObjectsButton.addEventListener('click', () => {
		console.log(fx_function.value);
        // Remove existing objects from the scene
		handleClearButtonClick();
		let parsedFunction_fx_function = parseAndCreateFunction(fx_function.value);
		let parsedFunction_fy_function = parseAndCreateFunction(fy_function.value);

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
	// Add event listener to the button
	generateDotButton.addEventListener('click', () => {
		console.log("현재 학습률 : " + dot_learning_rate.value);
		
		console.log(dot_x.value);
		console.log(dot_y.value);

    	// Geometry and Material
		const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
		const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
		const sphereDot = new THREE.Mesh(sphereGeometry, sphereMaterial);
		sphereDot.position.x = dot_x.value;
		sphereDot.position.z = dot_y.value;
		let parsedFunction_fx_function = parseAndCreateFunction(fx_function.value);
		let parsedFunction_fy_function = parseAndCreateFunction(fy_function.value);

		sphereDot.position.y = parsedFunction_fx_function(dot_x.value) + parsedFunction_fy_function(dot_y.value);
		// sphereDot.position.y = 0;
		scene.add(sphereDot);
	});


	// 그리기
	const clock = new THREE.Clock();
	let lastExecutionTime = 0; // 마지막 작업 실행 시간
	let meshesTomove = [];
	let meshesCurCoord = [];
	let meshesTomoveCoord = [];

	function draw() {
		// const delta = clock.getDelta();
		const elapsedTime = clock.getElapsedTime(); // 경과된 총 시간을 초 단위로 가져옴
		let ratioA = (elapsedTime - lastExecutionTime) / 10;
		let ratioB = 1 - ratioA;

		for(let i = 0; i < meshesTomove.length; i++){
			// console.log(meshesTomove.at(i));
			meshesTomove.at(i).position.x=parseFloat(meshesCurCoord[i][0])*ratioB + parseFloat(meshesTomoveCoord[i][0])*ratioA;
			meshesTomove.at(i).position.y=parseFloat(meshesCurCoord[i][1])*ratioB + parseFloat(meshesTomoveCoord[i][1])*ratioA;
			meshesTomove.at(i).position.z=parseFloat(meshesCurCoord[i][2])*ratioB + parseFloat(meshesTomoveCoord[i][2])*ratioA;
		}
		// 10초마다 특정 작업 수행
    	if (elapsedTime - lastExecutionTime >= 10) {
        	// 여기서 10초마다 실행할 작업 수행
        	console.log("10초가 경과했습니다. dot 갱신을 진행합니다.");
//
        	// 마지막 작업 실행 시간 갱신
			let parsedFunction_fx_function = parseAndCreateFunction(fx_function.value);
			let parsedFunction_fy_function = parseAndCreateFunction(fy_function.value);

			meshesTomove = [];
			scene.children.forEach(child => {
				if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
					// child가 Mesh이면서 geometry가 SphereGeometry인 경우에만 meshesToRemove 배열에 추가합니다.
					meshesTomove.push(child);
				}
			});

			meshesCurCoord = [];
			meshesTomoveCoord = [];
			meshesTomove.forEach(mesh => {
				let meshesCurCoordTemp = [];
				meshesCurCoordTemp.push(mesh.position.x);
				meshesCurCoordTemp.push(mesh.position.y);
				meshesCurCoordTemp.push(mesh.position.z);
				meshesCurCoord.push(meshesCurCoordTemp);

				let meshesTomoveCoordTemp = [];
				let newX = parseFloat(mesh.position.x) - (dot_learning_rate.value * numericalDifferentiation(parsedFunction_fx_function, parseFloat(mesh.position.x)));
				let newZ = parseFloat(mesh.position.z) - (dot_learning_rate.value * numericalDifferentiation(parsedFunction_fy_function, parseFloat(mesh.position.z)));
				meshesTomoveCoordTemp.push(newX);
				meshesTomoveCoordTemp.push(parsedFunction_fx_function(newX) + parsedFunction_fy_function(newZ));
				meshesTomoveCoordTemp.push(newZ);
				// console.log(parseFloat(mesh.position.x));
				// console.log(newX);
				// console.log(meshesTomoveCoordTemp[0]);

				meshesTomoveCoord.push(meshesTomoveCoordTemp);
			});
//
			
			// const meshesTomove = [];
			// scene.children.forEach(child => {
			// 	if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
			// 		// child가 Mesh이면서 geometry가 SphereGeometry인 경우에만 meshesToRemove 배열에 추가합니다.
			// 		meshesTomove.push(child);
			// 	}
			// });
		
			// meshesTomove.forEach(mesh => {
			// 	// scene.remove(mesh); // meshesToRemove 배열에 있는 모든 구를 scene에서 제거합니다.
			// 	mesh.position.x = Math.random() * 10 - 5; // x 좌표를 -5에서 5 사이의 랜덤 값으로 설정
			// 	mesh.position.z = Math.random() * 10 - 5; // z 좌표를 -5에서 5 사이의 랜덤 값으로 설정
			// 	mesh.position.y = parsedFunction_fx_function(mesh.position.x) + parsedFunction_fy_function(mesh.position.z);
			// });
	
        	lastExecutionTime = elapsedTime;
    	}

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
