class SelectObject {

	constructor (parent, label, text, param = {}) {
		this.label = label;
		this.parent = parent;

		this.element = document.createElement("div");

		this.element.innerHTML = text;

		this.element.style.fontSize = parent.selectStyle.fontSize != undefined ? parent.selectStyle.fontSize + "px" : parent.dialog.element.style.fontSize;
		this.element.style.fontFamily = parent.selectStyle.fontFamily != undefined ? parent.selectStyle.fontFamily : parent.dialog.element.style.fontFamily;

		this.element.style.backgroundColor = parent.selectStyle.backgroundColor;
		this.element.style.color = parent.selectStyle.color;
		this.element.style.borderRadius = parent.selectStyle.borderRadius + "px";

		this.element.style.marginLeft = parent.selectStyle.margin.left + "px";
		this.element.style.marginRight = parent.selectStyle.margin.right + "px";
		this.element.style.marginTop = parent.selectStyle.margin.top + "px";
		this.element.style.marginBottom = parent.selectStyle.margin.bottom + "px";

		this.element.style.paddingLeft = parent.selectStyle.padding.left + "px";
		this.element.style.paddingRight = parent.selectStyle.padding.right + "px";
		this.element.style.paddingTop = parent.selectStyle.padding.top + "px";
		this.element.style.paddingBottom = parent.selectStyle.padding.bottom + "px";

		this.element.style.cursor = "pointer";

		this.element.onclick = (event) => {
			event.stopPropagation();
			this.parent.goto(this.label);
			this.parent.play();
		}

		this.element.onmouseover = () => {
			this.element.style.backgroundColor = this.parent.selectStyle.hover.backgroundColor;
			this.element.style.color = this.parent.selectStyle.color;
		}

		this.element.onmouseout = () => {
			this.element.style.backgroundColor = this.parent.selectStyle.backgroundColor;
			this.element.style.color = this.parent.selectStyle.hover.color;
		}

	}

}

class GameObject {

	constructor(name, parent) {
		this.parent = parent;
		this.name = name;
	}

	setProperty(propertyName, value) {
		// set property value
		switch(propertyName) {
			case "image":
				if (this.image == undefined) {
					this.image = document.createElement("img");
					this.parent.element.insertBefore(this.image, this.parent.dialog.element);
					this.image.style.bottom = this.x != undefined ? this.x + "px" : "0px";
					this.image.style.left = this.y != undefined ? this.y + "px" : "0px";
					this.image.style.position = "absolute";
					if (this.visible == undefined) {
						this.image.style.display = "none";
					} else {
						this.image.style.display = this.visible == "false" ? "none" : "block";
					}
					this.image.style.opacity = this.opacity != undefined ? this.opacity : 1;
				}
				this[propertyName].src = value;
				return;
			case "x":
				if (this.image != undefined) {
					this.image.style.left = value + "px";
				}
				break;
			case "y":
				if (this.image != undefined) {
					this.image.style.bottom = value + "px";
				}
				break;
			case "visible":
				if (this.image != undefined) {
					this.image.style.display = value == "false" ? "none" : "block";
				}
				break;
			case "opacity":
				if (this.image != undefined) {
					this.image.style.opacity = value;
				}
				break;
			case "value":
				break;
			default:
				console.log("script error: property " + propertyName + " is unsupported");
				return;
		}
		this[propertyName] = value;
	}

}

class Dialog {

	constructor(parent, param) {

		this.parent = parent;

		this.element = document.createElement("div");

		this.element.style.position = "absolute";
		this.element.style.cursor = "default";

		this.element.style.display = param.visible != undefined ? param.visible ? "block" : "none" : "block";

		var paddingParam = param.padding != undefined ? param.padding : {};
		var paddingLeft = paddingParam.left != undefined ? paddingParam.left : 15;
		var paddingRight = paddingParam.right != undefined ? paddingParam.right : 15;
		var paddingTop = paddingParam.top != undefined ? paddingParam.top : 15;
		var paddingBottom = paddingParam.bottom != undefined ? paddingParam.bottom : 15;
		var width = param.width != undefined ? param.width : 640;
		var height = param.height != undefined ? param.height : 160;

		this.element.style.width = (width - paddingLeft - paddingRight) + "px";
		this.element.style.height = (height - paddingTop - paddingBottom) + "px";
		this.element.style.paddingLeft = paddingLeft + "px";
		this.element.style.paddingRight = paddingRight + "px";
		this.element.style.paddingTop = paddingTop + "px";
		this.element.style.paddingBottom = paddingBottom + "px";

		this.element.style.left = (param.x != undefined ? param.x : 0) + "px";
		this.element.style.bottom = (param.y != undefined ? param.y : 0) + "px";

		this.element.style.background = param.backgroundColor != undefined ? param.backgroundColor : "rgba(0, 0, 64, 0.7)";

		this.element.style.color = param.color != undefined ? param.color : "#FFF";

		this.element.style.opacity = param.opacity != undefined ? param.opacity : 1;

		this.element.style.backgroundPosition = "bottom left";
		if (param.backgroundImage != undefined) {
			this.element.style.backgroundImage = "url(\"" + param.backgroundImage + "\")";
		}

		this.element.style.fontSize = (param.fontSize != undefined ? param.fontSize : 20) + "px";
		this.element.style.fontFamily = param.fontFamily != undefined ? param.fontFamily : "arial";

		this.element.innerHTML = "";

	}

}

class Game {

	constructor(param) {

		this.clearFlag = true;
		this.pauseFlag = false;
		this.selectFlag = false;

		this.loadQueue = [];

		this.program = [];
		this.programPosition = 0;

		this.element = document.createElement("div");

		this.element.style.position = "relative";
		this.element.style.overflow = "hidden";

		this.element.style.userSelect = "none";

		this.name = param.name != undefined ? param.name : "";

		// size (width, height)

		this.element.style.width = (param.width != undefined ? param.width : 640) + "px";
		this.element.style.height = (param.height != undefined ? param.height : 640) + "px";

		// backgroundColor

		this.element.style.background = param.backgroundColor != undefined ? param.backgroundColor : "#000";

		// backgroundImage

		this.element.style.backgroundPosition = "bottom left";
		this.element.style.backgroundRepeat = "no-repeat";
		if (param.backgroundImage != undefined) {
			this.element.style.backgroundImage = "url(\"" + param.backgroundImage + "\")";
		}

		// dialog

		this.dialog = new Dialog(this, param.dialog != undefined ? param.dialog : {});
		this.element.appendChild(this.dialog.element);

		// game objects

		this.gameObjects = [];

		this.selectObjects = [];

		this.element.onclick = (event) => {
			if (!this.selectFlag) {
				this.play();
			}
		}
		document.onkeydown = (event) => {
			if (this.selectFlag) {
				for (var i = 0; i < this.selectKeyCodes.length; i++) {
					if (this.selectKeyCodes[i] == event.code) {
						if (this.selectObjects[i] != undefined) {
							this.goto(this.selectObjects[i].label);
							this.play();
						}
					}
				}
				return;
			}
			if (event.key == " ") {
				this.play();
			}
		}


		var selectParam = param.dialog != undefined ? param.dialog.select != undefined ? param.dialog.select : {} : {};

		// коды клавиш выбора
		this.selectKeyCodes = selectParam.keyCodes != undefined ? selectParam.keyCodes : [
			"Digit1",
			"Digit2",
			"Digit3",
			"Digit4"
		];

		var selectParamMargin = selectParam.margin != undefined ? selectParam.margin : {};
		var selectParamPadding = selectParam.padding != undefined ? selectParam.padding : {};
		var selectParamHover = selectParam.hover != undefined ? selectParam.hover : {};
		var selectParamHoverMargin = selectParamHover.margin != undefined ? selectParamHover.margin : {};
		var selectParamHoverPadding = selectParamHover.padding != undefined ? selectParamHover.padding : {};

		this.selectStyle = {
			fontSize: selectParam.fontSize != undefined ? selectParam.fontSize : undefined,
			fontFamily: selectParam.fontFamily != undefined ? selectParam.fontFamily : undefined,
			color: selectParam.color != undefined ? selectParam.color : "#FFF",
			backgroundColor: selectParam.backgroundColor != undefined ? selectParam.backgroundColor : "#888",
			borderRadius: selectParam.borderRadius != undefined ? selectParam.borderRadius : 6,
			margin: {
				left: selectParamMargin.left != undefined ? selectParamMargin.left : 0,
				right: selectParamMargin.right != undefined ? selectParamMargin.right : 0,
				top: selectParamMargin.top != undefined ? selectParamMargin.top : 0,
				bottom: selectParamMargin.bottom != undefined ? selectParamMargin.bottom : 0
			},
			padding: {
				left: selectParamPadding.left != undefined ? selectParamPadding.left : 0,
				right: selectParamPadding.right != undefined ? selectParamPadding.right : 0,
				top: selectParamPadding.top != undefined ? selectParamPadding.top : 0,
				bottom: selectParamPadding.bottom != undefined ? selectParamPadding.bottom : 0
			},
			hover: {
				color: selectParamHover.color != undefined ? selectParamHover.color : "#FFF",
				backgroundColor: selectParamHover.backgroundColor != undefined ? selectParamHover.backgroundColor : "#888",
			}
		};

	}

	getGameObject(name) {
		for (let i = 0; i < this.gameObjects.length; i++) {
			var obj = this.gameObjects[i];
			if (obj.name == name) {
				return obj;
			}
		}
	}

	say(text) {

		var t = "";
		var s = "";
		var varFlag = false;
		for (var i = 0; i < text.length; i++) {
			if (varFlag) {
				if (text[i] == "}") {
					varFlag = false;
					var obj = this.getGameObject(s);
					if (obj) {
						t += obj.value.toString();
					} else {
						console.log("script error: game object " + s + " is not found");
					}
					s = "";
					continue;
				}
				s += text[i];
				continue;
			}
			if ((text[i] == "\\") && (text[i + 1] == "{")) {
				t += "{";
				i++;
				continue;
			}
			if (text[i] == "{") {
				varFlag = true;
				continue;
			}
			t += text[i];
		}

		if (this.clearFlag) {
			this.clearFlag = false;
			this.dialog.element.innerHTML = t;
			return;
		} else {
			this.dialog.element.innerHTML += "<br>" + t;
		}
	}

	goto(labelName) {
		for (var i = 0; i < this.program.length; i++) {
			if (this.program[i][0].value ==  "#label") {
				if (labelName == this.program[i][1].value) {
					this.programPosition = i;
					return;
				}
			}
		}
		console.log("script error: lable \"" + labelName + "\" not found");
	}

	// установить параметры переменной
	setCmd(param) {
		// ищем GameObject в памяти
		var object = this.getGameObject(param[1].value);
		// создаем новый GameObject если ненашли
		if (object == undefined) {
			object = new GameObject(param[1].value, this);
			this.gameObjects.push(object);
		}
		// устанавливаем параметры
		var paramIndex = 2;
		while (paramIndex < param.length) {
			if (param[paramIndex + 1]) {
				if (param[paramIndex + 1].value == ":") {
					object.setProperty(param[paramIndex].value, param[paramIndex + 2].value);
					paramIndex += 3;
					continue;
				}
			}
			object.setProperty("value", param[paramIndex].value);
			paramIndex++;
		}
	}

	playOneCommand() {
		if (this.programPosition < this.program.length) {
			var cmd = this.program[this.programPosition];
			var marker = cmd[0].value[0];

			var self = this;
			switch (marker) {
				case "#":
					switch (cmd[0].value) {
						case "#end":
							this.programPosition = this.program.length;
							break;
						case "#if":

							if (cmd[1]) {
								var v0;
								if (cmd[1].quoteFlag) {
									v0 = cmd[1].value;
								} else {
									var obj = this.getGameObject(cmd[1].value);
									v0 = obj ? obj.value : cmd[1].value;
								}
							} else {
								console.log("script error: #if v0 undefined");
								break;
							}

							if (cmd[2]) {

							} else {
								console.log("script error: #if sign undefined");
								break;
							}

							if (cmd[3]) {
								var v1;
								if (cmd[3].quoteFlag) {
									v1 = cmd[3].value;
								} else {
									var obj = this.getGameObject(cmd[3].value);
									v1 = obj ? obj.value : cmd[3].value;
								}
							} else {
								console.log("script error: #if v1 undefined");
								break;
							}

							if (!cmd[4]) {
								console.log("script error: #if label undefined");
								break;
							}

							switch (cmd[2].value) {
								case "==":
									if (v0 == v1) {
										this.goto(cmd[4].value);
									}
									break;
								case "!=":
									if (v0 != v1) {
										this.goto(cmd[4].value);
									}
									break;
								case ">":
									if (v0 > v1) {
										this.goto(cmd[4].value);
									}
									break;
								case "<":
									if (v0 < v1) {
										this.goto(cmd[4].value);
									}
									break;
								case ">=":
									if (v0 >= v1) {
										this.goto(cmd[4].value);
									}
									break;
								case "<=":
									if (v0 <= v1) {
										this.goto(cmd[4].value);
									}
									break;
								default:
									console.log("script error: unknown sing");
									return;
							}

							break;
						case "#show":
							if (cmd[1] != undefined) {
								let obj = this.getGameObject(cmd[1].value);
								obj["visible"] = true;
								if (obj.image) {
									obj.image.style.display = "block";
								}
							}
							break;
						case "#hide":
							if (cmd[1] != undefined) {
								let obj = this.getGameObject(cmd[1].value);
								obj["visible"] = false;
								if (obj.image) {
									obj.image.style.display = "none";
								}
							}
							break;
						case "#select":
							var selectObject = new SelectObject(this, cmd[1].value, cmd[2].value);
							this.dialog.element.appendChild(selectObject.element);
							this.selectFlag = true;
							this.selectObjects.push(selectObject);
							break;
						case "#goto":
							this.goto(cmd[1].value);
							break;
						case "#label":
							break;
						case "#pause":
							this.pauseFlag = true;
							if (cmd[1] != "noclear") {
								this.clearFlag = true;
							}
							break;
						case "#set":
							this.setCmd(cmd);
							break;
						case "#background":
							this.element.style.backgroundImage = "url(\"" + cmd[1].value + "\")";
							break;
						case "#run":
							if (cmd[1].value != undefined) {
								this.playScript(cmd[1].value);
							} else {
								this.programPosition = 0;
								this.program = [];
								this.dialog.element.innerHTML = "error: use #play scriptFileName";
								console.log("script error: use #play scriptFileName")
							}
							return;
					}
					break;
				case ">":
					this.say(cmd[1].value);
					break;
			}
			this.programPosition++;
		} else {
			return false;
		}
		return true;
	}

	play(script) {
		if (this.loadQueue.length > 0 ) {
			return;
		}
		this.selectFlag = false;
		this.pauseFlag = false;
		if (script != undefined) {
			this.program = Parser.parse(script);
			this.programPosition = 0;
		}
		if (this.selectObjects.length > 0) {
			this.selectObjects = [];
			this.dialog.element.innerHTML = "";
		}
		while (game.playOneCommand()) {
			if (this.loadQueue.length > 0 ) {
				break;
			}
			if (this.pauseFlag) {
				break;
			}
		}
	}

	playScript(fileName, position = 0) {
		var req = new XMLHttpRequest();
		var self = this;

		var q = "load script " + fileName;
		this.loadQueue.push(q);

		req.overrideMimeType("text/plain");
		req.open("GET", fileName);

		req.onreadystatechange  = function() {
			if (req.readyState == 4) {
				var indexOfQ = self.loadQueue.indexOf(q);
				if (indexOfQ != -1) {
					self.loadQueue.splice(indexOfQ, 1);
				}
				if (req.status == 200) {
					var script = req.response.replace(/\r/g, "").split("\n");
					self.play(script, position);
				} else {
					console.log("script error: can't load " + fileName);
					self.dialog.element.innerHTML = "";
					self.dialog.element.innerHTML = "error: can't load script " + fileName;
					self.play([]);
				}
			}
		}

		req.send();
	}

}
