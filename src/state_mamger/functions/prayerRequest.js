import { message, notification } from "antd"
import firebase from "../../utils/networks/firebaseConfig"

const FETCH_PRAYER_REQUESTS = "FETCH_PRAYER_REQUESTS"
const FETCH_PRAYER_SUCCESS = "FETCH_PRAYER_SUCCESS"
const MARK_AS_READ_REQUEST= "MARK_AS_READ_REQUEST"
const MARK_AS_READ_SUCCESS= "MARK_AS_READ_SUCCESS"
const MARK_AS_READ_FAILED= "MARK_AS_READ_FAILED"
const MARK_AS_DONE_FAILED= "MARK_AS_DONE_FAILED"
const MARK_AS_DONE_REQUEST= "MARK_AS_DONE_REQUEST"
const MARK_AS_DONE_SUCCESS= "MARK_AS_DONE_SUCCESS"


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
    .onSnapshot(query=>{
        const items =[] 
        query.docs.forEach(doc=>{
            const data = doc.data()
            const id = doc.id
            items.push({...data,id})
        })
        dispatch(fetchPrayerSuccess(items))

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

export const markAsRead = (item)=>dispatch=>{
    console.log(item);
    dispatch(markAsReadRequest())
    const ref = firebase.firestore().collection("prayerRequests")
    ref.doc(item.id).set({...item,is_read:!item.is_read}).then(res=>{
        message.success("Prayer request is updated succefully")
       dispatch( markAsReadSuccess(res))
    }).catch(err=>{
        notification.error({
            message:"An error occured!",
            description:String(err)
        })

        dispatch(markAsReadFailed())
    })
}



const markAsDoneRequest = ()=>{
    return {
        type:MARK_AS_DONE_REQUEST,
    }
}

const markAsDoneSuccess = prayer=>{
    return {
        type:MARK_AS_DONE_SUCCESS,
        payload:prayer
    }
}

const markAsDoneFailed =()=>{
    return {
        type:MARK_AS_DONE_FAILED
    }
}



export const markAsDone= (prayer)=>dispatch=>{
    dispatch(markAsDoneRequest())
    const ref = firebase.firestore().collection("prayerRequests")
    ref.doc(prayer.id).update({done:!prayer.done}).then(res=>{
        message.success("Prayer request is updated succefully")
       dispatch(markAsDoneSuccess(res))
    }).catch(err=>{
        notification.error({
            message:"An error occured!",
            description:String(err)
        })
        dispatch(markAsDoneFailed())
    })
}

export const deletePrayer= (prayer)=>dispatch=>{
    dispatch(markAsDoneRequest())
    const ref = firebase.firestore().collection("prayerRequests")
    ref.doc(prayer.id).delete().then(res=>{
        message.success("Prayer request deleted successfully")
       dispatch(markAsDoneSuccess(res))
    }).catch(err=>{
        notification.error({
            message:"An error occured!",
            description:String(err)
        })
        dispatch(markAsDoneFailed())
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
         
        }
    case MARK_AS_READ_FAILED:
        return {
            ...state,
            updateLoading:false
        }
    case MARK_AS_DONE_REQUEST:
        return{
            ...state,
            updateLoading:true
        }
    case MARK_AS_DONE_SUCCESS:
        return{
            ...state,
            updateLoading:false,
        
        }

     case MARK_AS_DONE_FAILED:
         return{
             ...state,
             updateLoading:false
         }

    default:
        return state
    }
}
