const fs = require("fs");
const path = require("path");

function createDirectory(directory) {
	try {
    	fs.mkdirSync(directory)
  	} catch (err) {
    	if (err.code !== 'EEXIST') throw err
  	}   	
}

function log(error) {
	
	console.log(error.message);
	
	fs.appendFile('scraper-error.log', `[${new Date()}] ${error.message}\n`, function (err) {
  		if (err) throw err;
	});
}

module.exports.create = createDirectory;
module.exports.log = log;