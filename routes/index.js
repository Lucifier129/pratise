var express = require('express')
var router = express.Router()
var body = require('../static/js/app')

var initialData = {
	data: 'render by React from server side'
}


/* GET home page. */
router.get('/', function(req, res) {
	var data = {
		title: 'test react server render',
		body: body(initialData),
		initialData: JSON.stringify(initialData)
	}
	res.render('index', data)
})

module.exports = router
