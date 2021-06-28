import { db } from "../../utils/networks/firebaseConfig"

const FETCH_LIVE_RECORDINGS_REQUEST = "FETCH_LIVE_RECORDINGS_REQUEST"
const FETCH_LIVE_RECORDINGS_COMPLETED = "FETCH_LIVE_RECORDINGS_COMPLETED"

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

export const fetchLiveRecordings=()=>dispatch=>{
    dispatch(fetchLiveRecordingsRequest())
    db.collection(collectionName)
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
    default:
        return state
    }
}

export default liveRecordingsReducer
