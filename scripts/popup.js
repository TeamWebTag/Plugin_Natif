function onLoad(){
	chrome.storage.sync.get({
	'Activ' : false,
	'Desac' : true,
	'ToolsOn' : false,
	'ToolsOFF' : true,
	'ToolsExist' : 'none'
	}, function(items){
	document.getElementById('activer').disabled = items.Activ;
	document.getElementById('desactiver').disabled = items.Desac;
	document.getElementById("On").disabled = items.ToolsOn;
	document.getElementById("Off").disabled = items.ToolsOFF;
	document.getElementById("outils").style.display = items.ToolsExist;
});
}

function DesAct(){
		chrome.storage.sync.set({
		'Activ' : false,
		'Desac' : true,
		'ToolsOn' : false,
		'ToolsOFF' : true,
		'ToolsExist' : 'none'
	}, function(items){
		chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {"todo" : "desactivateExt"});
		});
		onLoad();
	});
};

function Act(){
	chrome.storage.sync.set({
		'Activ' : true,
		'Desac' : false,
		'ToolsOn' : false,
		'ToolsOFF' : true,
		'ToolsExist' : ''
	}, function(items){
		chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
			var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id, {"todo" : "activateExt"});
		});
		onLoad();
	});
};

function ToolsOn(){
	chrome.storage.sync.set({
		'ToolsOn' : true,
		'ToolsOFF' : false,
		'ToolsExist' : ''
	}, function(items){
		chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
			var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id, {"todo" : "actTools"});
		});
		onLoad();
});
};

function ToolsOff(){
	chrome.storage.sync.set({
		'ToolsOn' : false,
		'ToolsOFF' : true,
		'ToolsExist' : ''
	}, function(items){
		chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {"todo" : "desTools"});
		});
		onLoad();
	});
};

document.addEventListener("DOMContentLoaded", function(){
	onLoad();
	document.getElementById('desactiver').addEventListener('click', DesAct);
	document.getElementById('activer').addEventListener('click', Act);
	document.getElementById('On').addEventListener('click', ToolsOn);
	document.getElementById('Off').addEventListener('click', ToolsOff);
});

