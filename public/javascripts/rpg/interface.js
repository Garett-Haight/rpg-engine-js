class Interface{
	constructor(game) {
		this.game = game;
        this.container = document.querySelector('#gameContainer');
       	

        this.statusPanel = document.createElement("div");
        this.statusPanel.id = "statusPanel";
        body.appendChild(this.statusPanel);

        // Health meter... or just a table for now
       // var healthMeter = document.createElement("div");
       // healthMeter.id = "healthMeter";
       // this.statusPanel.appendChild(healthMeter);
       	var statusTable = document.createElement("table");
       	var tr = document.createElement("tr");
       	var td = document.createElement("td");
       	td.innerText = "HP: ";
       	statusTable.appendChild(tr);
       	tr.appendChild(td);

       	var td2 = document.createElement("td");
       	td2.innerText = "100/100";
       	tr.appendChild(td2);

       	statusPanel.appendChild(statusTable);


        this.controlsElement = document.createElement("div");
        this.controlsElement.id = "controls";
        body.appendChild(this.controlsElement);

        var arrowDiv = document.createElement("div");
        var actionDiv = document.createElement("div");
        this.controlsElement.appendChild(arrowDiv);
        this.controlsElement.appendChild(actionDiv);

        this.createButton("Check", "checkButton", actionDiv, "interact");
        this.createButton("Inventory", "invButton", actionDiv, null);

        this.createButton("▲", "upArrowButton", arrowDiv, "moveUp");
        this.createButton("◀", "leftArrowButton", arrowDiv, "moveLeft");
        this.createButton("▶", "rightArrowButton", arrowDiv, "moveRight");
        this.createButton("▼", "downArrowButton", arrowDiv, "moveDown");
	}

	createButton(text, id, appendTo=this.container, func) {
        var button = document.createElement("button");
        button.innerText = text;
        button.id = id;
        appendTo.appendChild(button);
        if ( typeof this.game.controls[func] !== 'undefined') {
        	button.addEventListener(
        		'click', 
        		function(e) {
        			this.game.controls[func](this.game.player);
        		}.bind(this)
        	);
        }
    }
}