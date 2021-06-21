import firebase from "../../utils/networks/firebaseConfig"
const FETCH_LIVE_STREAM_DATA_REQUEST = "FETCH_LIVE_STREAM_DATA_REQUEST"
const FETCH_LIVE_STREAM_DATA_COMPLETE = "FETCH_LIVE_STREAM_DATA_COMPLETE"

export const liveStreamStatus = {
    Pending:"pending",
    Completed:"Completed"
}

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
    db.collection("liveStreams")
    .orderBy("timestamp","desc")
    .onSnapshot(queryString=>{
        const streams = []
        queryString.forEach(doc=>{
            streams.push( {id:doc.id, ...doc.data()})
        })
        dispatch(fetchLiveStreamComplete(streams))
    })

}



const initialState = {
    loading:false,
    data:[]

}

export const streamReducer= (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_LIVE_STREAM_DATA_REQUEST :
        return { ...state, loading:true}
    case FETCH_LIVE_STREAM_DATA_COMPLETE:
        return {...state,loading:false,data:payload}
    default:
        return state
    }
}
