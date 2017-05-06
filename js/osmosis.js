// https://github.com/rchipka/node-osmosis/wiki#follow
// https://www.npmjs.com/package/osmosis

const osmosis = require("osmosis");
const csv = require('./csv.js');
const file = require('./file.js');

function scrape(url, directory) {
	// append to passed url
	let shirt_url = url += '/shirts.php';
	const shirts = [];
	const time = new Date().toString().substring(4, 24);
	
	osmosis
	.get(shirt_url)
	.find('ul.products > li > a')
	// set url key with href value
	.set('url', '@href')
	.follow('@href')
	.set({
	'image': ['img@src'][0],
	'price': 'span.price',
	'title': 'head title'
	})
	.data(function(listing) {
		// push an object to shirts array
		shirts.push({
			'Title': listing.title,
			'Price': listing.price,
			'ImageURL': listing.image,
			'URL': listing.url,
			'Time': time
		});
	})
	.done(function() {
		// write the shirts to the csv
		if (shirts.length > 0) {
			csv.write(directory, shirts);
		} else {
			const message = 'no shirt objects were found. Were the html elements changed?';
			const error = new Error(message);
			file.log(error);
		}
	});
	
}

module.exports.scrape = scrape;