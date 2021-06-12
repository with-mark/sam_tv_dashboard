import { db } from "../../utils/networks/firebaseConfig"


const FETCH_CHATS_REQUEST = "FETCH_CHATS_REQUEST"
const FETCH_CHATS_SUCCESS = "FETCH_CHATS_SUCCESS"
const collectionName= "liveComments"


const fetchChatsRequest = ()=>{
    return {
        type:FETCH_CHATS_REQUEST
    }
}



const fetchChatsSuccess=payload=>{
    return{
        type:FETCH_CHATS_SUCCESS,
        payload
    }
}


export const fetchChats=()=>dispatch=>{
    dispatch(fetchChatsRequest())
    db.collection(collectionName).onSnapshot(query=>{
        let chats = []
        query.forEach(doc=>{
            chats.push({
                id:doc.id,
                ...doc.data()
            })
        })
        dispatch(fetchChatsSuccess(chats))
    })
}



const initialState = {
    loading:false,
    data:[]

}

const samTvChatsReducer= (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_CHATS_REQUEST:
        return { ...state, loading:true}

    case FETCH_CHATS_SUCCESS:
        return {
            ...state,
            loading:false,
            data:payload
        }

    default:
        return state
    }
}

export default samTvChatsReducer
