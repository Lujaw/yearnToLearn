;
var visualizer = (function() {
	var debug = true,
		speed = 450,
		delay = 20,

		initialize = function() {
			//initialize the grid
			Grid.init({
				transition: true,
				speed: speed,
				delay: delay,

			});
			animateColor();
			// responsiveText();
		},

		//create random colors in the div

		randomColordiv = function() {
			var colors = ["#FO533F", "#089BD7", "#E9A13E", "#E8694F", "#B85B60", "#5D345A", "#4E9F67", "#4C6699", "#E7463E", "#9BC8C8"],
				cell = $("div.randomcolor");

			cell.each(function() {
				selectedColor = colors[Math.floor(Math.random() * colors.length)];
				$(this).css("background-color", selectedColor);

			});
		},

		animateColor = function() {
			window.setInterval(function() {
				randomColordiv();
			}, 2000);
		},

		responsiveText = function() {
			console.log("responsive called");
			// $('.responsive-text').each(function() {
			// 	console.log("fittext");
			// 	$(this).fitText(1.2, {
			// 		minFontSize: '40px',
			// 		maxFontSize: '60px'
			// 	})
			// });
		}

	initialize();
})()