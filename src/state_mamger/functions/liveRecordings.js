import { message, notification } from "antd"
import { db } from "../../utils/networks/firebaseConfig"

const FETCH_LIVE_RECORDINGS_REQUEST = "FETCH_LIVE_RECORDINGS_REQUEST"
const FETCH_LIVE_RECORDINGS_COMPLETED = "FETCH_LIVE_RECORDINGS_COMPLETED"

const DELETE_LIVE_RECORDINGS_REQUEST = "DELETE_LIVE_RECORDINGS_REQUEST"
const DELETE_LIVE_RECORDINGS_COMPLETED = "DELETE_LIVE_RECORDINGS_COMPLETED"

const collectionName = "liveRecordings"

const fetchLiveRecordingsRequest=()=>{
    return {
        type: FETCH_LIVE_RECORDINGS_REQUEST
    }
}

const fetchLiveRecordingsCompleted=payload=>{
    return{
        type: FETCH_LIVE_RECORDINGS_COMPLETED,
        payload
    }
}


const deleteLiveRecordingsRequest=()=>{
    return {
        type: DELETE_LIVE_RECORDINGS_REQUEST
    }
}

const deleteLiveRecordingsCompleted=()=>{
    return{
        type: DELETE_LIVE_RECORDINGS_COMPLETED,
    
    }
}

export const deleteRecordings=recording=>dispatch=>{
    dispatch(deleteLiveRecordingsRequest())
    db.collection(collectionName)
    .doc(recording.id)
    .delete()
    .then(()=>{
        dispatch(deleteLiveRecordingsCompleted())
        message.success("You have succesfuly deleted a recording")
    }).catch((err)=>{
        console.log(err);
       notification.error({
           message:"Deleting live recording failed",
           description:"Unexpected error occured"
       })

    })
}

    


export const fetchLiveRecordings=()=>dispatch=>{
    dispatch(fetchLiveRecordingsRequest())
    db.collection(collectionName)
    .orderBy('timestamp','desc')
    .onSnapshot((querySnapshot)=>{
        const liveRecordings = []
        querySnapshot.forEach(doc=>{
            liveRecordings.push({
                id:doc.id,
                ...doc.data()
            })
        })
        dispatch(fetchLiveRecordingsCompleted(liveRecordings))
    })
}


const initialState = {
    loading:false,
    data:[]

}

const liveRecordingsReducer= (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_LIVE_RECORDINGS_REQUEST:
        return { ...state, 
        loading:true
        }
    case FETCH_LIVE_RECORDINGS_COMPLETED:
        return{
            ...state,
            loading:false,
            data:payload
        }
    case DELETE_LIVE_RECORDINGS_REQUEST:
        return { ...state, 
                loading:true
                }
    case DELETE_LIVE_RECORDINGS_COMPLETED:
           return { ...state, 
        loading:false
        }
    default:
        return state
    }
}

export default liveRecordingsReducer
