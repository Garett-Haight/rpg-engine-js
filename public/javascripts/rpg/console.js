export default class Console {
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
		messageWrapper.className = "message";
		if(type) {
			messageWrapper.className += " " + type;
		}
		this.consoleElement.appendChild(messageWrapper);
		// scroll to bottom of console
		this.consoleElement.scrollTop = this.consoleElement.scrollHeight;
	}
}