var	Canvas {

	main_canvas: document.getElementById("main_canvas"),
	main_ctx: undefined,
	
	preview_canvas: document.getElementById("preview_canvas"),
	preview_ctx: undefined,

	init: function()
	{
		this.main_ctx = this.main_canvas.getContext("2d");
		this.preview_ctx = this.preview_canvas.getContext("2d");

		this.handelEvent();
	}
}