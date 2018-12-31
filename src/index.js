import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import Modal from 'react-modal'
import './index.css'
import reducers from './redux/reducers'
import App from './containers/App'

const store = createStore(reducers, applyMiddleware(thunk, logger))

Modal.setAppElement('#root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)