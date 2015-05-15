import {React} from 'react'
import Div from './div'

class Box extends React.Component {
	constructor(props) {
		super(props)
		this.state = this.props.content
	}
	componentDidMount() {
		let count = 0
		setInterval(() => this.setState({
			content: (++count) + ' seconds'
		}), 1000)
	}
	render() {
		return <Div className="box1">{this.state.content}</Div>
	}
}

export default Box