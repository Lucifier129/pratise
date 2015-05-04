var express = require('express')
var router = express.Router()
var React = require('react')

var Body = React.createClass({displayName: "Body",
	render: function() {
		return (
			React.createElement("h1", null, this.props.name)
			)
	}
})

var body = React




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
