import {React} from 'react'
import Box from './box'
let initialDataDom = document.getElementById('initialData')
let initialData = JSON.parse(initialDataDom.innerHTML)
initialDataDom.parentNode.removeChild(initialDataDom)

React.render(
	<Box {...initialData} />,
	document.getElementById('container')
)