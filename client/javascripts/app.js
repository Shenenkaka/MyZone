import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'

class Root extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>Hello, My Zone</div>
    )
  }
}

ReactDom.render(
  <Root/>
, document.getElementById('root'))
