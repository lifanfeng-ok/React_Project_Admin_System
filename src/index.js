import React, { Component } from 'react'
import App from './App'
import ReactDom from 'react-dom'
import storage from "./Utils/storage";
import memory from "./Utils/memory";
import {Provider} from "react-redux";
import store from './Redux/store'

// 如果 local 中保存了 user, 将 user 保存到内存中
const user = storage.getUser()
if(user && user._id) {
     memory.user = user
}

ReactDom.render(<Provider store={store}>
     <App />
  </Provider>,document.getElementById('root'))

