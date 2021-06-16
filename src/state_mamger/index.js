import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import eventsReducer from './functions/events';
import { streamReducer } from './functions/liveStreams';
import { motivationReducer } from './functions/motivations';
import { prayerRequestReducer } from './functions/prayerRequest';
import samTvReducer from './functions/samTv';
import samTvChatsReducer from './functions/samTvChats';
import sermonsReducer from './functions/sermons';
import { testimonyReducer } from './functions/testimonies';
import userInfoReducer from './functions/userInfo';
import usersReducer from './functions/users';



const rootReducer = combineReducers({
motivation:motivationReducer,
liveStreams:streamReducer,
prayerRequest:prayerRequestReducer,
sermons:sermonsReducer,
events:eventsReducer,
samtv:samTvReducer,
samTvChats:samTvChatsReducer,
users:usersReducer,
userInfo:userInfoReducer,
testimony:testimonyReducer,
})

 
const store = createStore(rootReducer,{},applyMiddleware(thunk))

export default store;