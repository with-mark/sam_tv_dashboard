import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { motivationReducer } from './functions/motivations';



const rootReducer = combineReducers({
motvation:motivationReducer
})

 
const store = createStore(rootReducer,{},applyMiddleware(thunk))

export default store;