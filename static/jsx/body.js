var React = require('react')
var Box = require('./box')
var Text = require('./text')

var Body = React.createClass({
	render: function() {
		return (
			<Box>
				<Text>{this.props.data.data}</Text>
			</Box>
			)
	}
})


module.exports = Body