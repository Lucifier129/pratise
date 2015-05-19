import * as React from 'react'
import todoDispatcher from './todoDispatcher'
import * as request from 'superagent'

export default class Client {
	constructor(View, Model) {
		this.View = View
		this.Model = Model
	}
	init() {
		this.model = new this.Model(this.getInitialData().todos)
		//this.render(init)
		window.addEventListener('hashchange', () => this.render(), false)
		window.addEventListener('unload', () => request.post('/todos').send(this.model.getTodos()), false)
		document.getElementById('todoapp').addEventListener('dblclick', function(e) {
			console.log(e.type)
			request.post('/todos').send({todos: this.model.getTodos()}).end(function() {
				console.log(arguments)
			})
			window.request = request
		}.bind(this), false)
		this.register()
		this.render()
	}
	getInitialData() {
		let initialDataStore = document.getElementById('initialData')
		let initalData = initialDataStore.innerHTML
		initialDataStore.parentNode.removeChild(initialDataStore)
		return JSON.parse(initalData)
	}
	register() {
		let model = this.model
		todoDispatcher.register((action) => {
			switch (action.actionType) {
				case 'addTodo':
					model.addTodo(action.title)
					break
				case 'toggleAll':
					model.setStateForAll(action.completed)
					break
				case 'updateTodo':
					model.updateTodo(action.todo)
					break
				case 'removeTodo':
					model.removeTodo(action.id)
					break
				case 'clearCompleted':
					model.clearCompleted()
					break
			}
			this.render()
		})
	}
	render(init) {
		let props = this.model.getData(init ? '/' : '/' + location.hash.replace('#/', ''))
		React.render(
			<this.View {...props} />,
			document.getElementById('todoapp')
		)
	}
}