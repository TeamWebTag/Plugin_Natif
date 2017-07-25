function import_image(file)
{
	document.getElementById("filename_p").innerHTML = file.name;
	document.getElementById("cancel_import_button").style.opacity = 0.8;
	document.getElementById("import_button").style.width = "280px";

	var img = new Image();
	var image_url = URL.createObjectURL(file);
	img.src = image_url;
	img.onload = function()
	{
		width_number.value = img.width;
		width_range.value = img.width;
		height_number.value = img.height;
		height_range.value = img.height;
		draw_canvas_grid(parseInt(width_number.value), parseInt(height_number.value));
		localStorage.setItem("import_image", 1);
		localStorage.setItem("image_url", URL.createObjectURL(file));
	}
}

function cancel_import()
{
	document.getElementById("filename_p").innerHTML = "Import image";
	document.getElementById("cancel_import_button").style.opacity = 0;
	document.getElementById("import_button").style.width = "320px";
	localStorage.setItem("import_image", 0);
}