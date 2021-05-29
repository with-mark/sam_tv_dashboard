import firebase from "../../utils/networks/firebaseConfig"

const FETCH_PRAYER_REQUESTS = "FETCH_PRAYER_REQUESTS"
const FETCH_PRAYER_SUCCESS = "FETCH_PRAYER_SUCCESS"


const fetchPrayerRequest=()=>{
    return {
        type : FETCH_PRAYER_REQUESTS
    }
}

const fetchPrayerSuccess = data=>{
    return {
        type:FETCH_PRAYER_SUCCESS,
        payload:data
    }
}






export const fetchPrayers = ()=>dispatch=>{
    dispatch(fetchPrayerRequest())
    const ref= firebase.firestore().collection("prayerRequests")
    const prayerRequests = []
    ref.onSnapshot(query=>{
        query.forEach(doc=>{
            prayerRequests.push(doc.data())
        })
        dispatch(fetchPrayerSuccess(prayerRequests))
    })
    
    
    
}


const initialState = {
    loading:true,
    data:[]

}

export const prayerRequestReducer =  (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_PRAYER_REQUESTS:
        return { ...state, loading:true}
    case FETCH_PRAYER_SUCCESS:
        return {
            ...state,
            loading:false,
            data:payload
        }

    default:
        return state
    }
}
