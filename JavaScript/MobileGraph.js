/*
* Generate a random and unique RGB colour array
*
* @param rownum the number of rows that need random colours (each row is a different colour)
*/
function getRandomColor(rownum) {
	var colorarray = new Array();
	var count=0;
	var tempColor="";
	while(count < rownum) {
		for(var i=0; i<rownum; i++) {
			var letters = '0123456789ABCDEF'.split('');
			var color = '#';
			for (var i = 0; i < 6; i++ ) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			color = hexToRgb(color);
			if(color != tempColor) {
				colorarray.push(color);
				count++;
			}
			tempColor = color;
		}
	}
    return colorarray;
}

/*
* Convert a hexadecmial value to an RGB array
*
* @param hex the hexadecmial value
*/
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

//Array method extension to remove blank entries from an array
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
//Find the maximum value (given all integers) occurence in an array
Array.max = function( array ){
    return Math.max.apply( Math, array );
};