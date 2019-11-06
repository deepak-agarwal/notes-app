import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userAuthReducer from '../reducers/userAuthReducer'
import categoryReducer from '../reducers/categoryReducer'
import noteReducer from '../reducers/noteReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userAuthReducer,
        category: categoryReducer,
        note: noteReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore