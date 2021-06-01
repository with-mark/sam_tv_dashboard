import { fas } from "@fortawesome/free-solid-svg-icons"
import { message, notification } from "antd"
import { db } from "../../utils/networks/firebaseConfig"

const FETCH_SERMONS_REQUEST = "FETCH_SERMONS_REQUEST"
const FETCH_SERMONS_SUCCESS = "FETCH_SERMONS_SUCCESS"
const ADD_SERMONS_REQUEST = "ADD_SERMONS_REQUEST"
const ADD_SERMONS_COMPLETED = "ADD_SERMONS_COMPLETED"

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
    db.collection("sermons").onSnapshot(query=>{
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

export const addSermon = sermon=>dispatch=>{
    dispatch(addSermonRequest())
    db.collection("sermons").add(sermon).then(()=>{
        dispatch(addSermonsCompleted())
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


    default:
        return state
    }
}
export default sermonsReducer