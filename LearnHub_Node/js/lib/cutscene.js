export function generateCutscene(talkInterface, images, texts) {
	// preload images
	for(const path of images)
		new Image().src = path;

	let currentImageIndex = 0;
	const
		size = images.length,
		img = new Image(),
		dialogueBox = document.createElement('div');
	function update() {
		img.src = images[currentImageIndex];

		const dialogue = document.createElement('div');
		dialogue.classList.add('message');
		// dialogue.classList.add(speaker);
		// dialogue.classList.add('assistant');
		dialogue.textContent = texts[currentImageIndex];
		dialogueBox.append(dialogue);
		dialogueBox.scrollTop = dialogueBox.scrollHeight;

		currentImageIndex++;
	}

	img.id = 'image';
	dialogueBox.id = 'dialogueBox';
	talkInterface.addEventListener('click', () => {
		if(currentImageIndex >= size)
			return;
		update();
	});
	update();
	talkInterface.append(img, dialogueBox);
}
