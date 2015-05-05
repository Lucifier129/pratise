var express = require('express')
var router = express.Router()
var React = require('react')
var util = require('util')

var initialDataString = require('./initialData.json')

var Body = React.createClass({
	render: function() {
		return (
			<h1 className="head">{this.props.children}</h1>
			)
	}
})

var initialData = JSON.parse(initialDataString)
var body = React.renderToString(<Body>{initialData.data}</Body>)
var initialDataScript= <script id="initialData" type="text/json">{initialDataString}</script>


/* GET home page. */
router.get('/', function(req, res) {
	var data = {
		title: 'test react server render',
		body: body,
		initialData: React.renderToStaticMarkup(initialDataScript)
	}
	console.log(data)
	res.render('index', data)
})

module.exports = router
