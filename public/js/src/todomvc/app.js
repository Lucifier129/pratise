import React from 'react'
import todoDispatcher from './todoDispatcher'
import Model from './model'
import View from './component/view'

class App {
	constructor(View, Model) {
		this.View = View
		this.Model = Model
	}
	init() {
		this.model = new this.Model(this.getInitialData().todos)
		//初始化渲染，获取服务端vdom tree
		this.render(this.model.getData('/'))
		this.render()
		this.register()
		window.addEventListener('hashchange', () => this.render(), false)
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
	render(props) {
		props = props || this.model.getData('/' + location.hash.replace('#/', ''))
		React.render(
			<this.View {...props} />,
			document.getElementById('todoapp')
		)
	}
}

new App(View, Model).init()