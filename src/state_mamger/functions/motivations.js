import { message } from "antd"
import { db } from "../../utils/networks/firebaseConfig"
import { pushNotificationNoImage } from "../../utils/pushNotification"
const FETCH_MOTIVATION_REQUEST = "FETCH_MOTIVATION_REQUEST"
const FETCH_MOTIVATION_SUCCESS = "FETCH_MOTIVATION_SUCCESS"
// const FETCH_MOTIVATION_FAILURE = "FETCH_MOTIVATION_FAILURE"
const POST_MOTIVATION_REQUEST = "POST_MOTIVATION_REQUEST"
const POST_MOTIVATION_COMPLETED = "POST_MOTIVATION_COMPLETED"

const DELETE_MOTIVATION_REQUEST = "DELETE_MOTIVATION_REQUEST"
const DELETE_MOTIVATION_COMPLETED = "DELETE_MOTIVATION_COMPLETED"

const UPDATE_MOTIVATION_REQUEST = "UPDATE_MOTIVATION_REQUEST"
const UPDATE_MOTIVATION_COMPLETED = "UPDATE_MOTIVATION_COMPLETED"


const collectionName = "motivation"

const fetchMotivationRequest= ()=>{
    return{
        type:FETCH_MOTIVATION_REQUEST
    }
}
const fetchMotivationSuccess= motivations=>{
    return{
        type:FETCH_MOTIVATION_SUCCESS,
        payload:motivations
    }
}


const postMotivationRequest = ()=>{
    return{
        type: POST_MOTIVATION_REQUEST
    }
}

const postMotivationCompleted=()=>{
    return{
        type:POST_MOTIVATION_COMPLETED
    }
}


const deleteMotivationRequest = ()=>{
    return{
        type: DELETE_MOTIVATION_REQUEST
    }
}

const deleteMotivationCompleted=()=>{
    return{
        type:DELETE_MOTIVATION_COMPLETED
    }
}

const updateMotivationRequest = ()=>{
    return{
        type: UPDATE_MOTIVATION_REQUEST
    }
}

const updateMotivationCompleted=()=>{
    return{
        type:UPDATE_MOTIVATION_COMPLETED
    }
}


export const updateMotivation =(motivation)=>dispatch=>{
    dispatch(updateMotivationRequest())
    db.collection(collectionName).doc(motivation.id).update({...motivation})
    .then(()=>{
        dispatch(updateMotivationCompleted())
        message.success("Motivation updated successfully")
    }).catch(err=>{
        dispatch(updateMotivationCompleted())
        message.error(`Updating motivation failed, reason: ${String(err)}`)
    })
}


export const deleteMotivation=(motivation)=>dispatch=>{
    dispatch(deleteMotivationRequest())
    db.collection(collectionName).doc(motivation.id).delete()
    .then(()=>{
        dispatch(deleteMotivationCompleted())
        message.success("Motivation deleted successfully")
    }).catch(err=>{
        dispatch(deleteMotivationCompleted())
        message.error(`Deleting motivation failed, reason: ${String(err)}`)
    })
}



export const postMotivation=(motivation)=>dispatch=>{
    dispatch(postMotivationRequest())
    db.collection(collectionName).add(motivation).then(()=>{
        dispatch(postMotivationCompleted())
        pushNotificationNoImage("Motivstion!",motivation.title,"sam_tv_motivation")
        message.success("Motivation posted successfully")
    }).catch(err=>{
        dispatch(postMotivationCompleted())
        message.error(`Posting motivation failed, reason: ${String(err)}`)
    })
}


export const fetchMotivations =()=>dispatch=>{
   dispatch(fetchMotivationRequest())
    const ref = db.collection(collectionName)
    let motivations = []
    ref.onSnapshot((querySnapshot)=>{
        querySnapshot.forEach(doc=>{
            const data = doc.data()
            const id = doc.id
            motivations.push({id,...data})
        })
        
    dispatch(fetchMotivationSuccess(motivations))

    })
    
}







const initialState = {
loading:false,
postLoading:false,
deleteLoading:false,
updateLoading:false,
data:[]
}


export const motivationReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_MOTIVATION_REQUEST:
        return { ...state, loading:true }

    case FETCH_MOTIVATION_SUCCESS:
        return{
            ...state,
            loading:false,
            data:payload
        }

    case POST_MOTIVATION_REQUEST:
        return{
            ...state,
            postLoading:true
        }
    case POST_MOTIVATION_COMPLETED:
        return{
            ...state,
            postLoading:false
        }
    case UPDATE_MOTIVATION_REQUEST:
        return{
            ...state,
            updateLoading:true
        }
    case UPDATE_MOTIVATION_COMPLETED:
        return{
            ...state,
            updateLoading:false
        }
    case DELETE_MOTIVATION_REQUEST:
        return{
            ...state,
            deleteLoading:true
        }
    case DELETE_MOTIVATION_COMPLETED:
        return{
            ...state,
            deleteLoading:false
        }

    default:
        return state
    }
}
