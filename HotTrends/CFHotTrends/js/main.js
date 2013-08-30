;

var visualizer = (function() {

	//instance variables
	var MAX_COLS = 3,
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


			//create the matrix selector
			matrixSelect = generateTable(MAX_COLS, MAX_COLS);
			matrixSelect.id = 'matrix-select';
			$matrixSelectContainer.prepend(matrixSelect);
			bindevents();
			createVisualization(MAX_COLS, MAX_COLS);
		},

		createVisualization = function(cols, rows) {
			visualization = generateVisualization(cols, rows);
			visualization.id = "visualization";
			// document.getElementById('visualization').innerHTML = "";
			document.getElementById('box_container').appendChild(visualization);
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
			$('#matrix-select td').on('click', function() {

				var no_cols = Math.sqrt($(".highlight").length);
				setVisualization(no_cols, no_cols);
			})
			if (!Modernizr.touch) {
				$('#matrix-button').on('mouseenter', openMatrixSelect);
				$('#matrix-button').on('mouseout', closeMatrixSelect);
			}

			$matrixSelectContainer.on('mouseleave', function() {
				matrixSelectShowing = false;
				$matrixSelectContainer.removeClass('showing');
			});
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
		},

		generateVisualization = function(rows, cols) {
			console.log("generatedMatrix");
			var m = document.createElement('div');

			for (var r = 0; r < rows; r++) {
				for (var c = 0; c < cols; c++) {

					var cell = document.createElement('div');
					cell.classList.add('cell');
					m.appendChild(cell);

				}
			}

			return m;

		},

		setVisualization = function(r, c) {
			rows = Math.max(Math.min(r, MAX_COLS - 1), 0);
			cols = Math.max(Math.min(c, MAX_COLS - 1), 0);

			$(visualization).find('.cell').each(function(k, v) {

				var col = Math.floor(k / MAX_COLS);
				var row = k % MAX_COLS;

				if (row > rows || col > cols) {
					console.log("inside if");
					// wipers[k].disabled = true;
					// v.style.display = 'none';

				} else {
					console.log("inside else");
					// Hm.
					// if (wipers[k].disabled) wipers[k].onTransitionEnd();

					// wipers[k].disabled = false;
					v.style.top = (row) / (rows + 1) * 100 + '%';
					v.style.left = (col) / (cols + 1) * 100 + '%';
					v.style.width = 1 / (cols + 1) * 101 + '%'; // hack for 1px line that shows up
					v.style.height = 1 / (rows + 1) * 101 + 'px';
					v.style.display = 'block';
				}

			});
		}

	initialize();

})();