var React = require('react')
var Box = require('./box')
var Text = require('./text')

var Body = React.createClass({displayName: "Body",
	render: function() {
		return (
			React.createElement(Box, null, 
				React.createElement(Text, null, this.props.data.data)
			)
			)
	}
})


module.exports = Body