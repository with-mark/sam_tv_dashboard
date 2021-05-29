import { notification } from "antd"
import firebase from "../../utils/networks/firebaseConfig"

const FETCH_PRAYER_REQUESTS = "FETCH_PRAYER_REQUESTS"
const FETCH_PRAYER_SUCCESS = "FETCH_PRAYER_SUCCESS"
const MARK_AS_READ_REQUEST= "MARK_AS_READ_REQUEST"
const MARK_AS_READ_SUCCESS= "MARK_AS_READ_SUCCESS"
const MARK_AS_READ_FAILED= "MARK_AS_READ_FAILED"


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
    ref
    .get().then(response=>{
        const items = response.docs.map(doc=>doc.data())
        dispatch(fetchPrayerSuccess(items))
        console.log(items);
    })
    .catch(err=>{
        notification.success({
            message:"Error occured"
        })
    })   
}

 const markAsReadRequest =() =>{
    return{
        type:MARK_AS_READ_REQUEST
    }
}

 const markAsReadSuccess =prayer=>{
    return {
        type: MARK_AS_READ_SUCCESS,
        payload:prayer
    }
}

const markAsReadFailed =()=>{
    return {
        type:MARK_AS_READ_FAILED,
        
    }
}


export const markAsRead = (id,is_read)=>dispatch=>{
    dispatch(markAsReadRequest())
    const ref = firebase.firestore().collection("prayerRequests")
    ref.doc(id).set({is_read}).then(res=>{
       dispatch( markAsReadSuccess(res))
    }).catch(err=>{
        notification.error({
            message:"An error occured!",
            description:String(err)
        })
        dispatch(markAsReadFailed())
    })
}


const initialState = {
    loading:true,
    updateLoading:false,
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
    case MARK_AS_READ_REQUEST:
        return{
            ...state,
            updateLoading:true
        }
    case MARK_AS_READ_SUCCESS:
        return {
            ...state,
            updateLoading:false,
            data: [
                ...state.data,
                state.data.forEach(prayer=>{
                    if(prayer.id === payload.id){
                        prayer = payload
                        return prayer
                    }
                    return prayer
                })
                
            ]
        }

    default:
        return state
    }
}
