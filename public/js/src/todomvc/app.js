import Model from './model'
import View from './component/view'
import Client from './client'
export default new Client(View, Model).init()