import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { streamReducer } from './functions/liveStreams';
import { motivationReducer } from './functions/motivations';
import { prayerRequestReducer } from './functions/prayerRequest';



const rootReducer = combineReducers({
motivation:motivationReducer,
liveStreams:streamReducer,
prayerRequest:prayerRequestReducer,
})

 
const store = createStore(rootReducer,{},applyMiddleware(thunk))

export default store;