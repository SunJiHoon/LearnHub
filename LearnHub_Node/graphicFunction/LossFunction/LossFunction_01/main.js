import {
	WebGLRenderer,
	Scene,
	Object3D,
	PerspectiveCamera,
	MeshBasicMaterial, ShaderMaterial, FrontSide, BackSide,
	Mesh, SphereGeometry, BufferGeometry,
	Float32BufferAttribute,
	Matrix4,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', () => {
	const
		canvas = document.getElementById('three-canvas'),
		canvasContainer = document.getElementById('canvas-container'),
		inputF = document.getElementById('f'),
		inputXMin = document.getElementById('xmin'),
		inputXMax = document.getElementById('xmax'),
		inputYMin = document.getElementById('ymin'),
		inputYMax = document.getElementById('ymax'),
		inputX0 = document.getElementById('x0'),
		inputY0 = document.getElementById('y0'),
		inputEta = document.getElementById('eta'),
		btnPlot = document.getElementById('btn-plot'),
		btnStep = document.getElementById('btn-step'),
		btnStop = document.getElementById('btn-stop'),
		vsh = document.getElementById('vsh'),
		fsh = document.getElementById('fsh');

	// renderer, scene, camera
	const renderer = new WebGLRenderer({
		canvas,
		antialias: true,
	});
	const scene = new Scene();
	const camera = new PerspectiveCamera(
		75, 1,
		0.1, 1000
	);
	camera.position.x = 2;
	camera.position.y = 2;
	camera.position.z = 4;
	function setSize() {
		const { width, height } = canvasContainer.getBoundingClientRect();
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
	}
	function setPixelRatio() {
		renderer.setPixelRatio(devicePixelRatio);
	}
	setSize();
	setPixelRatio();
	scene.add(camera);

	// controls
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;

	// listen to canvas size change
	const observer = new ResizeObserver(() => setSize());
	observer.observe(canvasContainer);
	// listen to devicePixelRatio change
	(function listen() {
		const media = matchMedia(`(resolution: ${devicePixelRatio}dppx)`);
		media.addEventListener('change', function callback() {
			media.removeEventListener('change', callback);
			setPixelRatio();
			listen();
		});
	})();

	// object hierarchy
	const
		sceneRoot = new Object3D(),
		plotRoot = new Object3D(),
		pointRoot = new Object3D();
	sceneRoot.applyMatrix4(new Matrix4(
		1, 0, 0, 0,
		0, 0, 1, 0,
		0, -1, 0, 0,
		0, 0, 0, 1,
	));
	scene.add(sceneRoot);
	sceneRoot.add(plotRoot);
	sceneRoot.add(pointRoot);

	// geometry
	const sphereGeometry = new SphereGeometry(0.1, 32, 32);

	// materials
	const
		uValueMin = { value: 0 },
		uValueMax = { value: 1 },
		plotMaterialFront = new ShaderMaterial({
			vertexShader: vsh.textContent,
			fragmentShader: fsh.textContent,
			uniforms: {
				valueMin: uValueMin,
				valueMax: uValueMax,
				opacity: { value: 1 },
			},
			side: FrontSide,
		}),
		plotMaterialBack = new ShaderMaterial({
			vertexShader: vsh.textContent,
			fragmentShader: fsh.textContent,
			uniforms: {
				valueMin: uValueMin,
				valueMax: uValueMax,
				opacity: { value: 0.25 },
			},
			side: BackSide,
			transparent: true,
		});
	const sphereMaterial = new MeshBasicMaterial({ color: 0xff0000 });

	function clearPoints() {
		pointRoot.clear();
	}
	function plot() {
		plotRoot.clear();
		clearPoints();

		// temporary f
		function f(x, y) {
			return x**2 + y**2;
		}

		const
			dx = 0.1, dy = 0.1,
			xmin = Math.floor(inputXMin.valueAsNumber/dx)*dx,
			xmax = Math.ceil(inputXMax.valueAsNumber/dx)*dx,
			ymin = Math.floor(inputYMin.valueAsNumber/dy)*dy,
			ymax = Math.ceil(inputYMax.valueAsNumber/dy)*dy,
			gridHeight = (ymax - ymin)/dy,
			gridWidth = (xmax - xmin)/dx,
			grid = [...Array(gridHeight + 1)].map((_, y) =>
				[...Array(gridWidth + 1)].map((_, x) =>
					f(xmin + x*dx, ymin + y*dy)
				)
			),
			gridCenter = [...Array(gridHeight)].map((_, y) =>
				[...Array(gridWidth)].map((_, x) =>
					f(xmin + (x + 0.5)*dx, ymin + (y + 0.5)*dy)
				)
			),
			values = [
				...grid.flat(1),
				...gridCenter.flat(1),
			],
			valueMin = values.reduce((acc, x) => Math.min(acc, x), Infinity),
			valueMax = values.reduce((acc, x) => Math.max(acc, x), -Infinity);
		uValueMin.value = valueMin;
		uValueMax.value = valueMax;

		function addPoint(xIndex, yIndex) {
			triangles.push(xmin + xIndex*dx, ymin + yIndex*dy, grid[yIndex][xIndex]);
		}
		const triangles = [];
		for(let y = 0; y < gridHeight; y++)
			for(let x = 0; x < gridWidth; x++) {
				const
					x1 = x, y1 = y,
					x2 = x + 1, y2 = y + 1,
					center = [xmin + (x + 0.5)*dx, ymin + (y + 0.5)*dy, gridCenter[y][x]];
				addPoint(x1, y1);
				addPoint(x2, y1);
				triangles.push(...center);
				addPoint(x2, y1);
				addPoint(x2, y2);
				triangles.push(...center);
				addPoint(x2, y2);
				addPoint(x1, y2);
				triangles.push(...center);
				addPoint(x1, y2);
				addPoint(x1, y1);
				triangles.push(...center);
			}
		const geometry = new BufferGeometry();
		geometry.setAttribute('position', new Float32BufferAttribute(triangles, 3));
		plotRoot.add(new Mesh(geometry, plotMaterialFront));
		plotRoot.add(new Mesh(geometry, plotMaterialBack));
	}

	// event listeners
	btnPlot.addEventListener('click', () => plot());
	btnStop.addEventListener('click', () => clearPoints());

	plot();

	// draw
	renderer.setAnimationLoop(() => {
		controls.update();
		renderer.render(scene, camera);
	});
});
