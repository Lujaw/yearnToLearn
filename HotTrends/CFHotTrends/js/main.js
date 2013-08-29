;

var visualizer = (function() {

	//instance variables
	var MAX_COLS = 5,
		FADE_DELAY = 10000,
		FADE_DUR = 500,
		wipers = [],
		lastUpdate,
		idleTimeout,
		matrixInitialized = false,
		matrix,
		matrixSelect,
		rows,
		cols,
		pipe,
		$matrixSelectContainer = $('#matrix_selector_container'),
		matrixSelectShowing = false,


		initialize = function() {

			console.log("initialized");
			bindevents();

			//create the matrix selector
			matrixSelect = generateTable(MAX_COLS, MAX_COLS);
			matrixSelect.id = 'matrix-select';
			$matrixSelectContainer.prepend(matrixSelect);
		},

		generateTable = function(rows, cols) {
			console.log("generated");
			var table = document.createElement('table');

			for (var r = 0; r < rows; r++) {
				var row = document.createElement('tr');
				table.appendChild(row);
				for (var c = 0; c < cols; c++) {

					var cell = document.createElement('td');
					row.appendChild(cell);

				}
			}
			return table;
		},

		openMatrixSelect = function() {
			clearTimeout(idleTimeout);
			$matrixSelectContainer.find("table").show();
			highlightRows(0, 0, 'highlight');
			matrixSelectShowing = true;
			$matrixSelectContainer.addClass('showing');
			console.log("opened");
		},
		bindevents = function() {
			console.log("events binded");
			$('#matrix-button').bind('click', openMatrixSelect)
			if (!Modernizr.touch) {
				$('#matrix-button').bind('mouseenter', openMatrixSelect);
				$('#matrix-button').bind('mouseout', closeMatrixSelect);
			}

			$(matrixSelect).find('td').each(function(k, v) {

				var col = Math.floor(k / MAX_COLS);
				var row = k % MAX_COLS;

				// Hover highlight
				$(this).bind('mousemove', function(e) {
					e.preventDefault();
					console.log("mousemove");
					highlightRows(col, row, 'highlight');
					return false;
				});
			});

		},
		closeMatrixSelect = function() {
			console.log("closed");
			matrixSelectShowing = true;
			// $matrixSelectContainer.find("table").hide();
		},
		highlightRows = function(cols, rows, className) {
			console.log("highlighted");
			$(matrixSelect).find('td').each(function(k, v) {

				var col = Math.floor(k / MAX_COLS);
				var row = k % MAX_COLS;

				if (col <= cols && row <= rows) {
					$(this).addClass(className);
				} else {
					$(this).removeClass(className);
				}

			});
		}


	initialize();

})();