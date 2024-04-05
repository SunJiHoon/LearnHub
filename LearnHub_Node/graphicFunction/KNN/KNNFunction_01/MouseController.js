export class MouseController {
	constructor(controls) {
		// 생성자
		this.keys = [];
        controls.domElement.addEventListener('mousedown', (e) => {
            console.log(e.button + ' 누름');
			this.keys[e.button] = true;
        });
        controls.domElement.addEventListener('mouseup', (e) => {
			console.log(e.button + ' 뗌');
			delete this.keys[e.button];
        });
	}
}
