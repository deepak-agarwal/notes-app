import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import  userAuthReducer from "../reducers/userauthReducer";

const configureStore = () => {
	const store = createStore(
		combineReducers({
                user:userAuthReducer
		}),applyMiddleware(thunk))
    return store
}

export default configureStore