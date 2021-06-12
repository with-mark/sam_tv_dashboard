import { message } from "antd"
import { db } from "../../utils/networks/firebaseConfig"

const collectionName = "userinfo"
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_COMPLETED= "FETCH_USERS_COMPLETED"

const DELETE_USERS_REQUEST = "DELETE_USERS_REQUEST"
const DELETE_USERS_COMPLETED= "DELETE_USERS_COMPLETED"



const fetchUsersRequest =()=>{
    return{
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersCompleted=payload=>{
    return{
        type:FETCH_USERS_COMPLETED,
        payload
    }
}


const deleteUsersRequest =()=>{
    return{
        type: DELETE_USERS_REQUEST
    }
}

const deleteUsersCompleted=payload=>{
    return{
        type:DELETE_USERS_COMPLETED,
        payload
    }
}



export const deleteUser=(item)=>dispatch=>{
    dispatch(deleteUsersRequest())
    db.collection(collectionName).doc(item.id).delete()
    .then(()=>{
        dispatch(deleteUsersCompleted())
        message.success("You have ")

    }).catch(err=>{
        dispatch(deleteUsersCompleted())
        message.error(`Deleting user failed, reason : ${String(err)}`)
    })

}


export const fetchUsers=()=>dispatch=>{
    dispatch(fetchUsersRequest())
    db.collection(collectionName).onSnapshot(query=>{
        let items = []
        query.forEach(doc=>{
            items.push({
                id:doc.id,
                ...doc.data()
            })
      
        })
            dispatch(fetchUsersCompleted(items))
    })

}


const initialState = {
    loading:false,
    data:[]
}

const usersReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_USERS_REQUEST:
        return { ...state, loading:true }
    
        case FETCH_USERS_COMPLETED:
            return {
                ...state,
                loading:false,
                data:payload
            }
        case DELETE_USERS_REQUEST:
            return{
                ...state,
                loading:true
                
            }
        case DELETE_USERS_COMPLETED:
            return{
                ...state,
                loading:false
            }
    default:
        return state
    }
}

export default usersReducer
