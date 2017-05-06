let csv = require('fast-csv');
let file = require('./file.js');

function writeToCSV(directory, objects) {
	
	// set date constant to construct file name
	const date = new Date();
	
	let file_name = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}.csv`;
	
	// check if directory exists. If not, create it
	file.create(directory);
	
	// if objects contains data, write to csv
	if (objects.length > 0) {
		csv.writeToPath(`${directory}/${file_name}`, objects, {headers: true})
		.on("finish", function() {
			console.log(`${file_name} written to`, directory);
   		});
	}
}

module.exports.write = writeToCSV;