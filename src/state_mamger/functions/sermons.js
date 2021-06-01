import { db } from "../../utils/networks/firebaseConfig"

const FETCH_SERMONS_REQUEST = "FETCH_SERMONS_REQUEST"
const FETCH_SERMONS_SUCCESS = "FETCH_SERMONS_SUCCESS"

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
        dispatch(fetchSermonesSuccess(items))
    })
}




const initialState = {
    loading:false,
    data:[]
}

export default (state = initialState, { type, payload }) => {
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


    default:
        return state
    }
}
