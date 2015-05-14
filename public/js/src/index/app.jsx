var React = require('react')

var Box = React.createClass({
	getInitialState: function() {
		return {
			content: this.props.content
		}
	},
	componentDidMount: function() {
		var count = 0
		setInterval(function() {
			this.setState({
				content: (++count) + ' seconds'
			})
		}.bind(this), 1000)
	},
	render: function() {
		return <div className="box1">{this.state.content}</div>
	}
})

if (typeof window !== 'undefined') {
	var initialDataDom = document.getElementById('initialData')
	var initialData = JSON.parse(initialDataDom.innerHTML)
	initialDataDom.parentNode.removeChild(initialDataDom)
	React.render(
		<Box {...initialData} />,
		document.getElementById('container')
		)
} else {
	module.exports = function(data) {
		return React.renderToString(<Box {...data} />)
	}
}

