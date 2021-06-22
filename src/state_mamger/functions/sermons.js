import { message, notification } from "antd"
import { db, storage } from "../../utils/networks/firebaseConfig"
import { pushNotificationNoImage } from "../../utils/pushNotification"

const FETCH_SERMONS_REQUEST = "FETCH_SERMONS_REQUEST"
const FETCH_SERMONS_SUCCESS = "FETCH_SERMONS_SUCCESS"
const ADD_SERMONS_REQUEST = "ADD_SERMONS_REQUEST"
const ADD_SERMONS_COMPLETED = "ADD_SERMONS_COMPLETED"
const EDIT_SERMONS_REQUEST = "EDIT_SERMONS_REQUEST"
const EDIT_SERMONS_COMPLETE = "EDIT_SERMONS_COMPLETE"
const DELETE_SERMONS_REQUEST = "DELETE_SERMONS_REQUEST"
const DELETE_SERMONS_COMPLETE = "DELETE_SERMONS_COMPLETE"


const fetchSermonsRequest=()=>{
    return {
        type:FETCH_SERMONS_REQUEST
    }
}

const fetchSermonesSuccess=sermons=>{
    return {
        type:FETCH_SERMONS_SUCCESS,
        payload:sermons
    }
}




export const fetchSermons = ()=>dispatch=>{
    dispatch(fetchSermonsRequest())
    db.collection("sermons")
    .orderBy('timestamp',"desc")
    .onSnapshot(query=>{
        const items = []
        query.forEach(doc=>{
            items.push(
                {id:doc.id,
                    ...doc.data()
                }
            )
        })
        console.log(items);
        dispatch(fetchSermonesSuccess(items))
    })
}



const addSermonRequest = ()=>{
    return {
        type:ADD_SERMONS_REQUEST
    }
}

const addSermonsCompleted =()=>{
    return {
        type:{
            type:ADD_SERMONS_COMPLETED
        }
    }
}





const deleteSermonRequest = ()=>{
    return {
        type:DELETE_SERMONS_REQUEST
    }
}

const deleteSermonsCompleted =()=>{
    return {
        type:{
            type:DELETE_SERMONS_COMPLETE
        }
    }
}


export const deleteSermon = (sermon)=>dispatch=>{
    dispatch(deleteSermonRequest())
    if(sermon.type === "file"){
        storage.ref()
        .child(sermon.fileRef)
        .delete()
    }
    db.collection("sermons").doc(sermon.id).delete()
    .then(()=>{
        dispatch(deleteSermonsCompleted())
        message.success("Deletion completed successfully")
    })
    .catch(err=>{
        dispatch(deleteSermonsCompleted())
        notification.error({
            message:"Error occured",
            description:String(err)
        })
    })
}

const editSermonRequest = ()=>{
    return{
        type:EDIT_SERMONS_REQUEST
    }
}
const editSermonSucceess = ()=>{
    return {
        type: EDIT_SERMONS_COMPLETE
    }
}


export const editSermon = (sermon,fields)=> dispatch=>{
    dispatch(editSermonRequest())
    db.collection("sermons").doc(sermon.id).update({...fields})
    .then(res=>{
        dispatch(editSermonSucceess())
        message.success("Sermon updated successfully")
    })
    .catch(err=>{
        dispatch(editSermonSucceess())
        notification.error({
            message:"An error occured",
            description:String(err)
        })
    })
}

export const addSermon = sermon=>dispatch=>{
    dispatch(addSermonRequest())
    db.collection("sermons").add(sermon).then(()=>{
        dispatch(addSermonsCompleted())
        pushNotificationNoImage("New sermon added",sermon.title,"sam_tv_sermons")
        message.success("Sermons added sussfully")
    }).catch(err=>{
        dispatch(addSermonsCompleted())
        console.log(err);
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

const sermonsReducer =  (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_SERMONS_REQUEST:
        return { ...state, 
        loading:true,
        
        }

    case FETCH_SERMONS_SUCCESS:
        return{
            ...state,
            loading:false,
            data:payload
        }
    case ADD_SERMONS_REQUEST:
        return {
            ...state,
            postLoading:true
        }
    case ADD_SERMONS_COMPLETED:
        return {
            ...state,
            postLoading:false
        }

    case EDIT_SERMONS_REQUEST:
        return{
            ...state,
            editLoading:true
        }
    case EDIT_SERMONS_COMPLETE:
        return{
            ...state,
            editLoading:false
        }
    case DELETE_SERMONS_REQUEST:
        return{
            ...state,
            loading:true,

        }
    case DELETE_SERMONS_COMPLETE:
        return{
            ...state,
            loading:false
        }


    default:
        return state
    }
}
export default sermonsReducer