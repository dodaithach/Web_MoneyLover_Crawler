var express = require('express');
var router = express.Router();
var request = require('request');  
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/craw', function(req, res) {
  	console.log('crawling...');
  	
  	var url = 'http://www.sacombank-sbr.com.vn/chuyen-doi-ngoai-te';
  	request(url, function(err, response, body){  
  		var result = {};

		if (!err && response.statusCode == 200) {
			var $ = cheerio.load(body);
			var tmp = [];
			var rows = $('.tygia-list tr td');
			
			rows.each(function() {
				tmp.push($(this).text());
			});

			var data = []
			for (var i = 4; i < tmp.length; i += 4) {
				var item = {};
				item.unit = tmp[i].substring(26,29);
				item.value = tmp[i+1].substring(26,32);
				data.push(item);
			}

			console.log(data);
			console.log(data[0].unit.length);
			console.log(data[0].value.length);

			result.success = {'data': data};
		}
		else {
			result.error = {'msg': 'Failed'};
		}

		console.log(result);
		res.json(result);
	});
});

module.exports = router;