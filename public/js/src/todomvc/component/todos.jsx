import React from 'react'
import Todo from './todo'

export default class Todos extends React.Component {
	render() {
		let todos = this.props.todos
		let todoList = Object.keys(todos).map((id) => <Todo key={id} {...todos[id]} />)
		return <ul id="todo-list">{todoList}</ul>
	}
}