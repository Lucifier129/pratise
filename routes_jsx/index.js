var express = require('express')
var router = express.Router()
var React = require('react')

var Body = React.createClass({
	render: function() {
		return (
			<h1>{this.props.name}</h1>
			)
	}
})

var body = React




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
