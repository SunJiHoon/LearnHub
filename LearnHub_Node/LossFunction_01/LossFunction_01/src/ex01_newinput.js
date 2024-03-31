import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: OrbitControls

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
	controls.enableDamping = true;
	// controls.enableZoom = false;
	// controls.maxDistance = 10;
	// controls.minDistance = 3;
	// controls.minPolarAngle = Math.PI / 4; // 45도
	// controls.minPolarAngle = THREE.MathUtils.degToRad(45);
	// controls.maxPolarAngle = THREE.MathUtils.degToRad(135);
	// controls.target.set(2, 2, 2);
	
	// controls.autoRotate = true;
	// controls.autoRotateSpeed = 50;



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


// // 수식 예시: "x * x + 2 * x - 7"
// const expression = "x * x + 2 * x - 7";
// const parsedFunction = parseAndCreateFunction(expression);

// // 예시 값 x = 3일 때의 결과
// const result = parsedFunction(3);
// console.log(result); // 출력: 8


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
        for (let i = parseFloat(x_start.value); i < parseFloat(x_end.value); i += 0.1) {
			for(let j = parseFloat(y_start.value); j < parseFloat(y_end.value); j+= 0.1){
				console.log(i);
				let material = new THREE.MeshStandardMaterial({
					color: `rgb(
						${ 50 + Math.floor(Math.random() * 205) },
						${ 50 + Math.floor(Math.random() * 205) },
						${ 50 + Math.floor(Math.random() * 205) }
					)`
				});
				let mesh = new THREE.Mesh(geometry, material);
				mesh.position.x = i;
				mesh.position.z = j;
				mesh.position.y = parsedFunction_fx_function(i) + parsedFunction_fy_function(j);
				scene.add(mesh);
			}
        }
	});

// // Add event listener to the button
// generateObjectsButton.addEventListener('click', () => {
//     // Get the number of objects from the input field
//     const objectCount = parseInt(objectCountInput.value);

//     // Check if the input is a valid number
//     if (!isNaN(objectCount)) {
//         // Remove existing objects from the scene
// 		handleClearButtonClick();

//         // Generate objects based on the input number
//         for (let i = 0; i < objectCount; i++) {
//             let material = new THREE.MeshStandardMaterial({
//                 color: `rgb(
//                     ${ 50 + Math.floor(Math.random() * 205) },
//                     ${ 50 + Math.floor(Math.random() * 205) },
//                     ${ 50 + Math.floor(Math.random() * 205) }
//                 )`
//             });
//             let mesh = new THREE.Mesh(geometry, material);
//             mesh.position.x = (Math.random() - 0.5) * 5;
//             mesh.position.y = (Math.random() - 0.5) * 5;
//             mesh.position.z = (Math.random() - 0.5) * 5;
//             scene.add(mesh);
//         }
//     } else {
//         // Notify the user if the input is not a valid number
//         alert('Please enter a valid number.');
//     }
// });


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
