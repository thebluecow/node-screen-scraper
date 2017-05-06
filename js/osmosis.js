// https://github.com/rchipka/node-osmosis/wiki#follow
// https://www.npmjs.com/package/osmosis

const osmosis = require("osmosis");
const csv = require('./csv.js');

function scrape(url, directory) {
	
	let shirt_url = url += '/shirts.php';
	const shirts = [];
	const time = new Date().toString().substring(4, 24);
	
	osmosis
	.get(shirt_url)
	.find('ul.products > li > a')
	.set('url', '@href')
	.follow('@href')
	.set({
	'image': ['img@src'][0],
	'price': 'span.price',
	'title': 'head title'
	})
	.data(function(listing) {
		shirts.push({
			'title': listing.title,
			'price': listing.price,
			'imageURL': listing.image,
			'url': listing.url,
			'time': time
		});
	})
	.done(function() {
		if (shirts.length > 0) {
			csv.write(directory, shirts);
		}
	});
	
}

module.exports.scrape = scrape;