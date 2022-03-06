export default class Console {
	consoleElement: HTMLUListElement;
	constructor(parent) {		
		console.log(parent);
		this.consoleElement = document.createElement('ul');
		this.consoleElement.id = "console";
		this.consoleElement.classList.add("panel");
		parent.appendChild(this.consoleElement);
	}

	sendMessage(message, type=null) {
		var messageWrapper = document.createElement("li");
		messageWrapper.innerText = message;
		// If console text is moved to canvas, be sure to avoid text rendering. Instead render images from bitmap fonts
		// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
		messageWrapper.className = "message";
		if(type) {
			messageWrapper.className += " " + type;
		}
		this.consoleElement.appendChild(messageWrapper);
		// scroll to bottom of console
		this.consoleElement.scrollTop = this.consoleElement.scrollHeight;
	}
}