const osmosis = require('./js/osmosis.js');
const file = require('./js/file.js');
const http = require('http');
// directory where csv will be saved. Called in osmosis.js
const directory = './data';
const url = 'http://shirts4mike.com';
let message = '';

let shirts = [];

// connect to the shirts4mike site and call osmosis
function connect(url) {
	
	try {
		const request = http.get(url, response => {
			
			switch (response.statusCode) {
				case 200:
					osmosis.scrape(url, directory);
					break;
				case 301:
					// if there's a redirect location, log a message and redirect
					message = `redirect to ${response.headers.location}`
					console.log(message);
					connect(response.headers.location);
					break;
				default:
					// if there's a problem with accessing the website
					message = `There’s been a ${response.statusCode} error. Cannot connect to ${url}`;
					const error = new Error(message);
					file.log(error);
			}
		});
	}
	catch (error) {
		// print any errors
		file.log(error);
	}	
}

connect(url);