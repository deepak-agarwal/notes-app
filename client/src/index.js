import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import configureStore from './store/configureStore'
import {setUser} from './actions/user'
import {startSetCategory} from './actions/category'
import {startSetNote} from './actions/note'
import {Provider} from 'react-redux'

import axios from './config/axios'


const store = configureStore()

// console.log(store.getState())

// store.subscribe(()=>{
//     console.log(store.getState())
// })
//handle page reloads
if(localStorage.getItem('authToken')) {
    axios.get('/api/users/account',{
        headers:{
            'x-auth': localStorage.getItem('authToken')
        }
    })
    .then(response=>{
        const user = response.data
        store.dispatch(setUser(user))
        store.dispatch(startSetNote())
    })
}

store.dispatch(startSetCategory())


const ele = <Provider store = {store}>
                <App/>
            </Provider>

ReactDOM.render(ele, document.getElementById('root'))


