let imageData = 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000FFFFFFFFFFFFFF0099999999999900FFFFFFFFFF00FFFFFFFFFF99999900FFFFFF0000FFFFFF00FFFF99999900FFFF00FF00FF00FF00FF99999900FFFF000000FFFF0000FF99999900FF0066666666FFFFFFFF99999900FFFF00FFFFFFFFFFFFFF99999900FFFF00FFFFFFFFFF000099999900FFFF00FFFFFFFF00999999999900FFFF00FFFFFF0099999999999900FFFF00FFFFFFFF00000099999900FFFFFF00FFFFFFFFFFFF009900FFFFFFFFFF0000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';

function chunkString(str, length) {
	return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

let width = 28;
let height = 28;

let fill = Array(width * (height - 16) / 2).fill('1').join('');
let task = fill + imageData + fill;

let cells = chunkString(task, width).map(x => x.split(''));

function genLine(line) {
	return "{ \'" + line.join("\',\'") + "\' }";
}

let startLine = "char image[" + height + "][" + width + "] = {\n\t";
let valuesString = cells.map(genLine).join(",\n\t");
let endLine = "\n};\n";
let matrixCString = startLine + valuesString + endLine;
require('fs').writeFileSync('out.c', matrixCString);