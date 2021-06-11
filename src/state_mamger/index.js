import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import eventsReducer from './functions/events';
import { streamReducer } from './functions/liveStreams';
import { motivationReducer } from './functions/motivations';
import { prayerRequestReducer } from './functions/prayerRequest';
import samTvReducer from './functions/samTv';
import samTvChatsReducer from './functions/samTvChats';
import sermonsReducer from './functions/sermons';



const rootReducer = combineReducers({
motivation:motivationReducer,
liveStreams:streamReducer,
prayerRequest:prayerRequestReducer,
sermons:sermonsReducer,
events:eventsReducer,
samtv:samTvReducer,
samTvChats:samTvChatsReducer,
})

 
const store = createStore(rootReducer,{},applyMiddleware(thunk))

export default store;