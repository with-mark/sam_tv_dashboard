import firebase from "../../utils/networks/firebaseConfig"
const FETCH_LIVE_STREAM_DATA_REQUEST = "FETCH_LIVE_STREAM_DATA_REQUEST"
const FETCH_LIVE_STREAM_DATA_COMPLETE = "FETCH_LIVE_STREAM_DATA_COMPLETE"

const fetchLiveStreamDataRequest  = ()=>{
    return{
        type:FETCH_LIVE_STREAM_DATA_REQUEST
    }
}

const fetchLiveStreamComplete  = data=>{
    return{
        type:FETCH_LIVE_STREAM_DATA_COMPLETE,
        payload:data
    }
}



export const fetchStreamData = ()=>dispatch =>{
    const db = firebase.firestore()
    dispatch(fetchLiveStreamDataRequest())
    const ref = db.collection("liveStreams")
    const streams = []
    ref.onSnapshot(queryString=>{
        queryString.forEach(doc=>{
            streams.push(doc.data())
        })
        dispatch(fetchLiveStreamComplete(streams))
    })

}



const initialState = {
    loading:false,
    data:[]

}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_LIVE_STREAM_DATA_REQUEST :
        return { ...state, loading:true}
    case FETCH_LIVE_STREAM_DATA_COMPLETE:
        return {...state,loading:false,data:payload}
    default:
        return state
    }
}
