var drawingApp = (function () {

	"use strict";

	var canvas,
		context,
		canvasWidth = 490,
		canvasHeight = 220,
		colorPurple = "#cb3594",
		colorGreen = "#659b41",
		colorYellow = "#ffcf33",
		colorBrown = "#986928",
		outlineImage = new Image(),
		crayonImage = new Image(),
		markerImage = new Image(),
		eraserImage = new Image(),
		crayonBackgroundImage = new Image(),
		markerBackgroundImage = new Image(),
		eraserBackgroundImage = new Image(),
		crayonTextureImage = new Image(),
		clickX = [],
		clickY = [],
		clickColor = [],
		clickTool = [],
		clickSize = [],
		clickDrag = [],
		paint = false,
		curColor = colorPurple,
		curTool = "crayon",
		curSize = "normal",
		mediumStartX = 18,
		mediumStartY = 19,
		mediumImageWidth = 93,
		mediumImageHeight = 46,
		drawingAreaX = 111,
		drawingAreaY = 11,
		drawingAreaWidth = 267,
		drawingAreaHeight = 200,
		toolHotspotStartY = 23,
		toolHotspotHeight = 38,
		sizeHotspotStartY = 157,
		sizeHotspotHeight = 36,
		totalLoadResources = 8,
		curLoadResNum = 0,
		sizeHotspotWidthObject = {
			huge: 39,
			large: 25,
			normal: 18,
			small: 16
		},

		clearCanvas = function () {

			context.clearRect(0, 0, canvasWidth, canvasHeight);
		},

		redraw = function () {

			var locX,
				locY,
				radius,
				i,
				selected,

				drawCrayon = function (x, y, color, selected) {

					context.beginPath();
					context.moveTo(x + 41, y + 11);
					context.lineTo(x + 41, y + 35);
					context.lineTo(x + 29, y + 35);
					context.lineTo(x + 29, y + 33);
					context.lineTo(x + 11, y + 27);
					context.lineTo(x + 11, y + 19);
					context.lineTo(x + 29, y + 13);
					context.lineTo(x + 29, y + 11);
					context.lineTo(x + 41, y + 11);
					context.closePath();
					context.fillStyle = color;
					context.fill();

					if (selected) {
						context.drawImage(crayonImage, x, y, mediumImageWidth, mediumImageHeight);
					} else {
						context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, x, y, 59, mediumImageHeight);
					}
				},

				drawMarker = function (x, y, color, selected) {

					context.beginPath();
					context.moveTo(x + 10, y + 24);
					context.lineTo(x + 10, y + 24);
					context.lineTo(x + 22, y + 16);
					context.lineTo(x + 22, y + 31);
					context.closePath();
					context.fillStyle = color;
					context.fill();

					if (selected) {
						context.drawImage(markerImage, x, y, mediumImageWidth, mediumImageHeight);
					} else {
						context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, x, y, 59, mediumImageHeight);
					}
				};

			if (curLoadResNum < totalLoadResources) {
				return;
			}

			clearCanvas();

			if (curTool === "crayon") {

				context.drawImage(crayonBackgroundImage, 0, 0, canvasWidth, canvasHeight);

				selected = (curColor === colorPurple);
				locX = selected ? 18 : 52;
				locY = 19;
				drawCrayon(locX, locY, colorPurple, selected);

				selected = (curColor === colorGreen);
				locX = selected ? 18 : 52;
				locY += 46;
				drawCrayon(locX, locY, colorGreen, selected);

				selected = (curColor === colorYellow);
				locX = selected ? 18 : 52;
				locY += 46;
				drawCrayon(locX, locY, colorYellow, selected);

				selected = (curColor === colorBrown);
				locX = selected ? 18 : 52;
				locY += 46;
				drawCrayon(locX, locY, colorBrown, selected);

			} else if (curTool === "marker") {

				context.drawImage(markerBackgroundImage, 0, 0, canvasWidth, canvasHeight);

				selected = (curColor === colorPurple);
				locX = selected ? 18 : 52;
				locY = 19;
				drawMarker(locX, locY, colorPurple, selected);

				selected = (curColor === colorGreen);
				locX = selected ? 18 : 52;
				locY += 46;
				drawMarker(locX, locY, colorGreen, selected);

				selected = (curColor === colorYellow);
				locX = selected ? 18 : 52;
				locY += 46;
				drawMarker(locX, locY, colorYellow, selected);

				selected = (curColor === colorBrown);
				locX = selected ? 18 : 52;
				locY += 46;
				drawMarker(locX, locY, colorBrown, selected);

			} else if (curTool === "eraser") {

				context.drawImage(eraserBackgroundImage, 0, 0, canvasWidth, canvasHeight);
				context.drawImage(eraserImage, 18, 19, mediumImageWidth, mediumImageHeight);
			}

			switch (curSize) {
			case "small":
				locX = 467;
				break;
			case "normal":
				locX = 450;
				break;
			case "large":
				locX = 428;
				break;
			case "huge":
				locX = 399;
				break;
			default:
				break;
			}
			locY = 189;
			context.beginPath();
			context.rect(locX, locY, 2, 12);
			context.closePath();
			context.fillStyle = '#333333';
			context.fill();

			context.save();
			context.beginPath();
			context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
			context.clip();

			for (i = 0; i < clickX.length; i += 1) {

				switch (clickSize[i]) {
				case "small":
					radius = 2;
					break;
				case "normal":
					radius = 5;
					break;
				case "large":
					radius = 10;
					break;
				case "huge":
					radius = 20;
					break;
				default:
					break;
				}

				context.beginPath();
				if (clickDrag[i] && i) {
					context.moveTo(clickX[i - 1], clickY[i - 1]);
				} else {
					context.moveTo(clickX[i] - 1, clickY[i]);
				}
				context.lineTo(clickX[i], clickY[i]);
				
				if (clickTool[i] === "eraser") {
					context.strokeStyle = 'white';
				} else {
					context.strokeStyle = clickColor[i];
				}
				context.lineCap = "round";
				context.lineJoin = "round";
				context.lineWidth = radius;
				context.stroke();
			}
			context.closePath();
			context.restore();

			if (curTool === "crayon") {
				context.globalAlpha = 0.4; 
				context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
			}
			context.globalAlpha = 1; 


			context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
		},

		addClick = function (x, y, dragging) {

			clickX.push(x);
			clickY.push(y);
			clickTool.push(curTool);
			clickColor.push(curColor);
			clickSize.push(curSize);
			clickDrag.push(dragging);
		},

		createUserEvents = function () {

			var press = function (e) {
				var sizeHotspotStartX,
					mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

				if (mouseX < drawingAreaX) { 
					if (mouseX > mediumStartX) {
						if (mouseY > mediumStartY && mouseY < mediumStartY + mediumImageHeight) {
							curColor = colorPurple;
						} else if (mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight * 2) {
							curColor = colorGreen;
						} else if (mouseY > mediumStartY + mediumImageHeight * 2 && mouseY < mediumStartY + mediumImageHeight * 3) {
							curColor = colorYellow;
						} else if (mouseY > mediumStartY + mediumImageHeight * 3 && mouseY < mediumStartY + mediumImageHeight * 4) {
							curColor = colorBrown;
						}
					}
				} else if (mouseX > drawingAreaX + drawingAreaWidth) { 

					if (mouseY > toolHotspotStartY) {
						if (mouseY > sizeHotspotStartY) {
							sizeHotspotStartX = drawingAreaX + drawingAreaWidth;
							if (mouseY < sizeHotspotStartY + sizeHotspotHeight && mouseX > sizeHotspotStartX) {
								if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge) {
									curSize = "huge";
								} else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
									curSize = "large";
								} else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
									curSize = "normal";
								} else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.small + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
									curSize = "small";
								}
							}
						} else {
							if (mouseY < toolHotspotStartY + toolHotspotHeight) {
								curTool = "crayon";
							} else if (mouseY < toolHotspotStartY + toolHotspotHeight * 2) {
								curTool = "marker";
							} else if (mouseY < toolHotspotStartY + toolHotspotHeight * 3) {
								curTool = "eraser";
							}
						}
					}
				}
				paint = true;
				addClick(mouseX, mouseY, false);
				redraw();
			},

			drag = function (e) {
				
				var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
					mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
				
				if (paint) {
					addClick(mouseX, mouseY, true);
					redraw();
				}
				e.preventDefault();
			},

			release = function () {
				paint = false;
				redraw();
			},

			cancel = function () {
				paint = false;
			};

			canvas.addEventListener("mousedown", press, false);
			canvas.addEventListener("mousemove", drag, false);
			canvas.addEventListener("mouseup", release);
			canvas.addEventListener("mouseout", cancel, false);

			canvas.addEventListener("touchstart", press, false);
			canvas.addEventListener("touchmove", drag, false);
			canvas.addEventListener("touchend", release, false);
			canvas.addEventListener("touchcancel", cancel, false);
		},

		resourceLoaded = function () {

			curLoadResNum += 1;
			if (curLoadResNum === totalLoadResources) {
				redraw();
				createUserEvents();
			}
		},

		
		init = function () {

			canvas = document.createElement('canvas');
			canvas.setAttribute('width', canvasWidth);
			canvas.setAttribute('height', canvasHeight);
			canvas.setAttribute('id', 'canvas');
			document.getElementById('canvasDiv').appendChild(canvas);
			if (typeof G_vmlCanvasManager !== "undefined") {
				canvas = G_vmlCanvasManager.initElement(canvas);
			}
			context = canvas.getContext("2d"); 

			crayonImage.onload = resourceLoaded;
			crayonImage.src = "images/crayon-outline.png";

			markerImage.onload = resourceLoaded;
			markerImage.src = "images/marker-outline.png";

			eraserImage.onload = resourceLoaded;
			eraserImage.src = "images/eraser-outline.png";

			crayonBackgroundImage.onload = resourceLoaded;
			crayonBackgroundImage.src = "images/crayon-background.png";

			markerBackgroundImage.onload = resourceLoaded;
			markerBackgroundImage.src = "images/marker-background.png";

			eraserBackgroundImage.onload = resourceLoaded;
			eraserBackgroundImage.src = "images/eraser-background.png";

			crayonTextureImage.onload = resourceLoaded;
			crayonTextureImage.src = "images/crayon-texture.png";

			outlineImage.onload = resourceLoaded;
			outlineImage.src = "images/watermelon-duck-outline.png";
		};

	return {
		init: init
	};
}());