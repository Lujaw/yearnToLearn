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
			loadJSON();
			animateValue();
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
				// animateValue();
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
		},

		loadJSON = function(obj) {
			var cells = $(".gt-visible");
			obj = [{
				"label": "Testing",
				"value": "123"
			}, {
				"label": "asdf",
				"value": "12asd3"
			}, {
				"label": "Testing",
				"value": "1asd23"
			}, {
				"label": "Testinasdg",
				"value": "112323"
			}]
			cells.each(function(i, elem) {
				$(elem).find("p").delay(100).html(function() {
					var counter = '<div class="counter">\
     <span class="digit-0"></span>\
     <span class="digit-0"></span>\
     <span class="digit-0"></span>\
     <span class="digit-0"></span>\
</div>';
					var string = obj[i]["label"] + "<br/><br/>" + obj[i]["value"]
					return string + counter;
				});
				console.log($(elem).find("p").html());

			}),
			animateValue = function() {
				$(".counter span").each(function() {
					var classname = "digit-" + parseInt(Math.random(0 - 9) * 10, 10);
					$(this).removeClass("digit-0").addClass(classname);
				});
			}

		}

	initialize();
})()