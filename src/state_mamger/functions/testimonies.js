import { message } from "antd"
import { db, storage } from "../../utils/networks/firebaseConfig"
// import { pushNotificationNoImage } from "../../utils/pushNotification"
const FETCH_TESTIMONY_REQUEST = "FETCH_TESTIMONY_REQUEST"
const FETCH_TESTIMONY_SUCCESS = "FETCH_TESTIMONY_SUCCESS"
// const FETCH_TESTIMONY_FAILURE = "FETCH_TESTIMONY_FAILURE"
// const POST_TESTIMONY_REQUEST = "POST_TESTIMONY_REQUEST"
// const POST_TESTIMONY_COMPLETED = "POST_TESTIMONY_COMPLETED"

const DELETE_TESTIMONY_REQUEST = "DELETE_TESTIMONY_REQUEST"
const DELETE_TESTIMONY_COMPLETED = "DELETE_TESTIMONY_COMPLETED"


const collectionName = "testimonies"

const fetchTestimoniesRequest= ()=>{
    return{
        type:FETCH_TESTIMONY_REQUEST
    }
}
const fetchTestimoniesSuccess= motivations=>{
    return{
        type:FETCH_TESTIMONY_SUCCESS,
        payload:motivations
    }
}




const deleteTestimoniesRequest = ()=>{
    return{
        type: DELETE_TESTIMONY_REQUEST
    }
}

const deleteTestimonyCompleted=()=>{
    return{
        type:DELETE_TESTIMONY_COMPLETED
    }
}







export const deleteTestimony=(motivation)=>dispatch=>{
    dispatch(deleteTestimoniesRequest())
    if(motivation.type === "picture" && motivation.imgRef){
        storage.ref().child(motivation.imgRef)
    }
    
    db.collection(collectionName).doc(motivation.id).delete()
    .then(()=>{
        dispatch(deleteTestimonyCompleted())
        message.success("Motivation deleted successfully")
    }).catch(err=>{
        dispatch(deleteTestimonyCompleted())
        message.error(`Deleting motivation failed, reason: ${String(err)}`)
    })
}





export const fetchTestimony =()=>dispatch=>{
   dispatch(fetchTestimoniesRequest())
    const ref = db.collection(collectionName).orderBy("timestamp","desc")
    ref.onSnapshot((querySnapshot)=>{
        const motivations = []
        querySnapshot.forEach(doc=>{
            const id = doc.id
            motivations.push({id,...doc.data()})
        })
     dispatch(fetchTestimoniesSuccess(motivations))



    })

    
}



const initialState = {
loading:false,
deleteLoading:false,
data:[]
}


export const testimonyReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_TESTIMONY_REQUEST:
        return { ...state, loading:true }

    case FETCH_TESTIMONY_SUCCESS:
        return{
            ...state,
            loading:false,
            data:payload
        }

    case DELETE_TESTIMONY_REQUEST:
        return{
            ...state,
            deleteLoading:true
        }
    case DELETE_TESTIMONY_COMPLETED:
        return{
            ...state,
            deleteLoading:false
        }

    default:
        return state
    }
}
