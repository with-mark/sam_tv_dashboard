import { db } from "../../utils/networks/firebaseConfig"


const FETCH_CHATS_REQUEST = "FETCH_CHATS_REQUEST"
const FETCH_CHATS_SUCCESS = "FETCH_CHATS_SUCCESS"
const FETCH_ALL_LIKES = "FETCH_ALL_LIKES"

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

const fetchAllLikes = (payload)=>{
    return {
        type:FETCH_ALL_LIKES,
        payload
    }
}


export  const fetchLikes=()=>dispatch=>{
    db.collection("liveLikes").onSnapshot(query=>{
        let items = []
        query.forEach(doc=>{
            items.push({
                id:doc.id,
                ...doc.data()
            })

        })
        dispatch(fetchAllLikes(items))

    })
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
        console.log(chats);
        dispatch(fetchChatsSuccess(chats))
    })
}

export const deleteAllChats=()=>{
   const ref = db.collection(collectionName)
   ref.onSnapshot(query=>{
        query.forEach(doc=>{
            ref.doc(doc.id).delete()
            
        })
    })
    
}


export const deleteAllLikes=()=>{
   const ref = db.collection("liveLikes")
   ref.onSnapshot(query=>{
        query.forEach(doc=>{
            ref.doc(doc.id).delete()
            
        })
    })
    
}



const initialState = {
    loading:false,
    data:[],
    likes:[]

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
    case FETCH_ALL_LIKES:
        return{
            ...state,
            likes:payload
        }
    default:
        return state
    }
}

export default samTvChatsReducer
