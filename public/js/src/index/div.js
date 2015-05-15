import {React} from 'react'

export default class Div extends React.Component {
	render() {
		return <div className={this.props.className || ''}>{this.props.children}</div>
	}
}