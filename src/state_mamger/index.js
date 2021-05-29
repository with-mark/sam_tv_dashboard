import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { streamReducer } from './functions/liveStreams';
import { motivationReducer } from './functions/motivations';



const rootReducer = combineReducers({
motvation:motivationReducer,
liveStreams:streamReducer
})

 
const store = createStore(rootReducer,{},applyMiddleware(thunk))

export default store;