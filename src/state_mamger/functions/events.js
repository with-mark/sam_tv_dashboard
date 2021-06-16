import { message, notification } from "antd"
import { db, storage } from "../../utils/networks/firebaseConfig"

const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST"
const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS"


const DELETE_EVENTS_REQUEST = "DELETE_EVENTS_REQUEST"
const DELETE_EVENTS_COMPLETE = "DELETE_EVENTS_COMPLETE"


const fetchEventsRequest=()=>{
    return {
        type:FETCH_EVENTS_REQUEST
    }
}

const fetchEventsSuccess=EVENTS=>{
    return {
        type:FETCH_EVENTS_SUCCESS,
        payload:EVENTS
    }
}




export const fetchEvents = ()=>dispatch=>{
    dispatch(fetchEventsRequest())
    db.collection("events").orderBy("timestamp","desc").onSnapshot(query=>{
        const items = []
        query.forEach(doc=>{
            items.push(
                {id:doc.id,
                    ...doc.data()
                }
            )
        })
        console.log(items);
        dispatch(fetchEventsSuccess(items))
    })
}








const deleteEventsRequest = ()=>{
    return {
        type:DELETE_EVENTS_REQUEST
    }
}

const deleteEventsCompleted =()=>{
    return {
        type:{
            type:DELETE_EVENTS_COMPLETE
        }
    }
}


export const deleteEvent = (event)=>dispatch=>{
    dispatch(deleteEventsRequest())
        storage.ref().child(event.imgRef)
        .delete()
    db.collection("events").doc(event.id).delete()
    .then(()=>{
        dispatch(deleteEventsCompleted())
        message.success("Deletion completed successfully")
    })
    .catch(err=>{
        dispatch(deleteEventsCompleted())
        notification.error({
            message:"Error occured",
            description:String(err)
        })
    })
}







const initialState = {
    loading:false,
    data:[]
}



const eventsReducer =  (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_EVENTS_REQUEST:
        return { ...state, 
        loading:true,
        
        }

    case FETCH_EVENTS_SUCCESS:
        return{
            ...state,
            loading:false,
            data:payload
        }
    case DELETE_EVENTS_REQUEST:
        return{
            ...state,
            loading:true,

        }
    case DELETE_EVENTS_COMPLETE:
        return{
            ...state,
            loading:false
        }


    default:
        return state
    }
}
export default eventsReducer