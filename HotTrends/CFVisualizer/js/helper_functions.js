//change the HEX to rgb
var rgbValues;

function colorConv(color) {
	R = hexToR(color);
	G = hexToG(color);
	B = hexToB(color);

	function hexToR(h) {
		return parseInt((cutHex(h)).substring(0, 2), 16)
	}

	function hexToG(h) {
		return parseInt((cutHex(h)).substring(2, 4), 16)
	}

	function hexToB(h) {
		return parseInt((cutHex(h)).substring(4, 6), 16)
	}

	function cutHex(h) {
		return (h.charAt(0) == "#") ? h.substring(1, 7) : h
	}


	rgbValues.push("rgb(" + R + "," + G + "," + B + ")")
	console.log(rgbValues)
}


//generate random colors

function get_random_color() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}
var colors = [];
for (i = 0; i <= 25; i++) {
	colors.push(get_random_color());
}


function random_color() {
	var colors = ["rgb(240, 83, 63)", "rgb(8, 155, 215)", "rgb(233, 161, 62)", "rgb(232, 105, 79)", "rgb(184, 91, 96)", "rgb(93, 52, 90)", "rgb(78, 159, 103)", "rgb(76, 102, 153)", "rgb(231, 70, 62)", "rgb(155, 200, 200)", "rgb(155, 210, 141)", "rgb(209, 180, 97)", "rgb(86, 55, 60)", "rgb(183, 89, 89)", "rgb(101, 145, 99)", "rgb(32, 161, 209)", "rgb(236, 168, 48)", "rgb(205, 56, 56)", "rgb(118, 171, 38)", "rgb(217, 155, 75)", "rgb(197, 82, 53)", "rgb(179, 97, 29)", "rgb(90, 95, 10)", "rgb(122, 25, 78)", "rgb(181, 64, 30)", "rgb(74, 171, 78)", "rgb(205, 27, 204)", "rgb(65, 239, 154)", "rgb(251, 177, 205)", "rgb(184, 50, 38)", "rgb(189, 26, 101)", "rgb(28, 15, 23)", "rgb(105, 238, 67)", "rgb(66, 67, 194)", "rgb(70, 117, 75)", "rgb(72, 136, 205)", "rgb(166, 74, 222)", "rgb(223, 131, 51)", "rgb(196, 202, 165)", "rgb(157, 200, 113)", "rgb(69, 155, 82)", "rgb(49, 223, 41)", "rgb(66, 193, 218)", "rgb(102, 163, 37)", "rgb(75, 212, 75)", "rgb(68, 204, 29)", "rgb(1, 4, 237)", "rgb(205, 57, 20)", "rgb(187, 107, 17)", "rgb(8, 168, 237)"];

	var unusedColors = colors;
	if (colors.length == 0) {
		unusedColors = colors
	}

	return unusedColors.splice(Math.random() * unusedColors.length, 1)[0];

}