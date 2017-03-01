import React from 'react'
import Router from './router'
import ReactDOM from 'react-dom'

// render the router
var root = document.createElement('div')
root.setAttribute('id', 'root')
document.body.appendChild(root)

ReactDOM.render(<Router/>, root)
