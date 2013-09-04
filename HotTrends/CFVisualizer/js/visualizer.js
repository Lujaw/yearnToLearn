;
var visualizer = (function() {
	var debug = true,
		speed = 450,
		delay = 20,
		WIPE_DELAY = 2000,
		blocks = [],
		data = [],
		dataIndex = 0,
		dataRefresh = 10000,
		url = "http://123testing.s3.amazonaws.com/CFVisualizer/js/worker_earning.json",


		initialize = function() {
			//initialize the grid
			Grid.init({
				transition: true,
				speed: speed,
				delay: delay,

			});
			// animateColor();
			getData();
			// loadJSON();
			initializeBlocks();
			// animateValue();
			// startAnimation();
			// responsiveText();
		},


		//load the JSON from the API
		getData = function() {

			//show the loading if the data is not loaded
			if (_.isEmpty(data)) {
				data = [{
					"label": "Loading",
					"value": "Please Wait..."
				}];
			}

			//refresh the data every dataRefresh time
			window.setInterval(function() {
				console.log("data refreshed");
				$.ajax({
					url: url,
					dataType: "jsonp",
					jsonpCallback: "workerEarning",
					/* Unique function name */
					success: function(jsonData) {
						/* Do something with data */
						console.log("before", data);
						data = jsonData;
						console.log("after", data);

					},
					error: function() {
						console.log("error occured");
					}
				});
			}, dataRefresh);
		},

		initializeBlocks = function() {
			$(".grid-block").each(function() {
				blocks.push(new Block(this));
			});

			_.each(blocks, function(item) {
				startAnimation(item)
			});
		}

		//create random colors in the div
	randomColordiv = function() {
		var colors = ["#F0533F", "#089BD7", "#E9A13E", "#E8694F", "#B85B60", "#5D345A", "#4E9F67", "#4C6699", "#E7463E", "#9BC8C8"],
			cell = $("div.pane");

		cell.each(function() {
			selectedColor = colors[Math.floor(Math.random() * colors.length)];
			$(this).css("background-color", selectedColor);

		});
	},

	startAnimation = function(block) {
		console.log("Animation started ")
		var delayedNext = function() {
			console.log("delay called ")
			block.timeout = setTimeout(block.next, Math.random() * 10 * WIPE_DELAY);
		};

		block.next = function() {
			console.log("block changed");
			// clearTimeout(block.timeout);
			var paneString = data[++dataIndex % data.length]["label"] + '<br />' + data[dataIndex % data.length]["value"];
			block.show(paneString, delayedNext);
		};

		block.next();

	},

	animateColor = function() {
		window.setInterval(function() {
			// randomColordiv();
			// _.each(blocks, function(item){
			// 	startAnimation(item)
			// });
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
		//find all the input spans
		var cells = $("span.input");



		data = _.shuffle(_.uniq(data));

	},
	animateValue = function() {
		$(".counter span").each(function() {
			var classname = "digit-" + parseInt(Math.random(0 - 9) * 10, 10);
			$(this).removeClass("digit-0").addClass(classname);
		});
	}



	initialize();
})()