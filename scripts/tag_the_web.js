var w = document.documentElement.scrollWidth;
var h = document.documentElement.scrollHeight;
var wild = false;
var CheminComplet = document.location.href;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
		if (request.todo == "activateExt"){
		var w = document.documentElement.scrollWidth;
		var h = document.documentElement.scrollHeight;
		var libfabric = document.createElement("script");
		libfabric.src = chrome.runtime.getURL('fabric.js/dist/fabric.js');
		document.body.appendChild(libfabric);
		// var dcanvas = document.createElement("canvas");

		var dcanvas = document.createElement("div");

		dcanvas.id = 'drawing_canvas';
		dcanvas.style.position = 'fixed';
		dcanvas.style.top = '0px';
		dcanvas.style.left = '0px';
		dcanvas.style.width = w + 'px';
		dcanvas.style.height = h + 'px';
		dcanvas.style.zIndex = '1000';
		//dcanvas.children.style.backgroundBlendMode = 'multiply';
		 // dcanvas.style.zIndex = '2147483644';
		// dcanvas.style.background = 'transparent';
		// dcanvas.style.pointerEvents = 'none';
		document.body.appendChild(dcanvas);
		var tools = document.createElement("div");
		tools.id = 'using_tools';
		tools.style.zIndex = '1001';
		tools.style.width = '80px';
		tools.style.height = '210px';
		tools.style.opacity = '1';
		tools.style.position = 'absolute';
		tools.style.backgroundColor = 'beige';
		tools.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 6px 10px';
		tools.style.top = '30px';
		tools.style.left = '10px';
		tools.style.opacity = '0';
		document.body.appendChild(tools);
		var crayon = document.createElement("img");
		crayon.id = 'pencil';
		crayon.src = chrome.runtime.getURL('img/lol.png');
		crayon.style.width = '50px';
		crayon.style.height = '50px';
		crayon.style.top =  '15px';
		crayon.style.left = '15px';
		crayon.style.borderRadius = '8px 8px 8px 8px';
		crayon.style.cursor = 'pointer';
		crayon.style.position = 'absolute';
		document.getElementById('using_tools').appendChild(crayon);
		var eraser = document.createElement("img");
		eraser.id = 'eraser';
		eraser.src = chrome.runtime.getURL('img/trash.png');
		eraser.style.width = '50px';
		eraser.style.height = '50px';
		eraser.style.top =  '80px';
		eraser.style.left = '15px';
		eraser.style.borderRadius = '8px 8px 8px 8px';
		eraser.style.cursor = 'pointer';
		eraser.style.position = 'absolute';
		document.getElementById('using_tools').appendChild(eraser);
		var upload = document.createElement('Input');
		upload.setAttribute('type', 'file');
		upload.id = 'upload';

		// var butcolor = document.createElement("button");
		// butcolor.name = 'gofuckyourself';
		// butcolor.className = "jscolor {valueElement:null,value:'ffffff'}";
		// butcolor.id = "color";
		// butcolor.style.border = "2px solid black";
		// butcolor.style.width = '50px';
		// butcolor.style.height = '50px';
		// butcolor.style.top =  '145px';
		// butcolor.style.left = '15px';
		// butcolor.style.borderRadius = '8px 8px 8px 8px';
		// butcolor.style.cursor = 'pointer';
		// butcolor.style.position = 'absolute';
		// document.getElementById('using_tools').appendChild(butcolor);
		} else if (request.todo == "desactivateExt"){
			var oldcanvas = document.getElementById('drawing_canvas');
			if (oldcanvas !== null){
				var tools = document.getElementById('using_tools');
				oldcanvas.parentNode.removeChild(oldcanvas);
				tools.parentNode.removeChild(tools);
				// window.location.reload();
			}
		}
		if (request.todo == "actTools"){
			var painting = false,
			    lastX = 0,
			    lastY = 0,
			    lineThickness = 5;
			document.getElementById('using_tools').style.opacity = '1';
			document.getElementById('pencil').onclick = function(){
			// var canTool = document.getElementById('defaultCanvas0');
				// canTool.style.pointerEvents = 'auto';
				if (document.getElementById('color').name !== "allok")
					document.getElementById('color').name = "allok";
			};
			document.getElementById('eraser').onclick = function(){
				if (document.getElementById('color').name !== "clearbitch")
					document.getElementById('color').name = "clearbitch";
			};
			document.getElementById('color').onclick = function(){};
		} else if (request.todo == "desTools"){
			var canTool = document.getElementById('drawing_canvas');
			canTool.style.pointerEvents = 'none';
			document.getElementById('using_tools').style.opacity = '0';
		}
});
