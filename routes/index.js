require('node-jsx').install({extension: '.jsx', harmony: true})
var express = require('express')
var router = express.Router()
var body = require('../public/js/src/index/server')

var initialData = {
	content: 'render by React from server side'
}


/* GET home page. */
router.get('/', function(req, res) {
	var data = {
		title: 'test react server render',
		body: body(initialData),
		initialData: JSON.stringify(initialData),
		appScript: 'js/dest/index.bundle.js'
	}
	res.render('index', data)
})

module.exports = router
