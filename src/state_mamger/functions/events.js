import { message, notification } from "antd"
import { db, storage } from "../../utils/networks/firebaseConfig"

const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST"
const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS"
const ADD_EVENTS_REQUEST = "ADD_EVENTS_REQUEST"
const ADD_EVENTS_COMPLETED = "ADD_EVENTS_COMPLETED"
const EDIT_EVENTS_REQUEST = "EDIT_EVENTS_REQUEST"
const EDIT_EVENTS_COMPLETE = "EDIT_EVENTS_COMPLETE"
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
    db.collection("events").onSnapshot(query=>{
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



const addEventsRequest = ()=>{
    return {
        type:ADD_EVENTS_REQUEST
    }
}

const addEventsCompleted =()=>{
    return {
        
        type:ADD_EVENTS_COMPLETED
        
    }
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


export const deleteSermon = (sermon)=>dispatch=>{
    dispatch(deleteEventsRequest())
    db.collection("events").doc(sermon.id).delete()
    .then(res=>{
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

const editEventsRequest = ()=>{
    return{
        type:EDIT_EVENTS_REQUEST
    }
}
const editEventsSucceess = ()=>{
    return {
        type: EDIT_EVENTS_COMPLETE
    }
}


export const editEvents = (sermon,fields)=> dispatch=>{
    dispatch(editEventsRequest())
    db.collection("events").doc(sermon.id).update({...fields})
    .then(res=>{
        dispatch(editEventsSucceess())
        message.success("Event updated successfully")
    })
    .catch(err=>{
        dispatch(editEventsSucceess())
        notification.error({
            message:"An error occured",
            description:String(err)
        })
    })
}

export const addEvents = event=>dispatch=>{
    console.log("adasdasdasd");
    dispatch(addEventsRequest())
    storage.ref(`images/events/${event.file.name}`).put(event.file)
            .then(res=>{
                storage.ref('images/events')
                .child(event.file.name)
                .getDownloadURL()
                .then(cover_image=>{
                    db.collection("events").add({
                        ...event.values,
                        cover_image
                    }).then(res=>{
                        dispatch(addEventsCompleted())
                        message.success("Succesffull")
                    }).catch(err=>{
                        dispatch(addEventsCompleted())
                        message.error("Unsasadasd")
                    })
                })
                .catch(err=>{
                    dispatch(addEventsCompleted())
                    notification.error({
                        message:"Error occured",
                        description:String(err)
                    })
                })
            })
            .catch(err=>{
                notification.error({
                    message:"Error occured",
                    description:String(err)
                })
            })
}


const initialState = {
    loading:false,
    postLoading:false,
    editLoading:false,
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
    case ADD_EVENTS_REQUEST:
        return {
            ...state,
            postLoading:true
        }
    case ADD_EVENTS_COMPLETED:
        return {
            ...state,
            postLoading:false
        }

    case EDIT_EVENTS_REQUEST:
        return{
            ...state,
            editLoading:true
        }
    case EDIT_EVENTS_COMPLETE:
        return{
            ...state,
            editLoading:false
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