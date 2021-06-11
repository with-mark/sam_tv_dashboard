import { db } from "../../utils/networks/firebaseConfig"
const FETCH_MOTIVATION_REQUEST = "FETCH_MOTIVATION_REQUEST"
const FETCH_MOTIVATION_SUCCESS = "FETCH_MOTIVATION_SUCCESS"
const FETCH_MOTIVATION_FAILURE = "FETCH_MOTIVATION_FAILURE"

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




export const fetchMotivations =()=>dispatch=>{
   dispatch(fetchMotivationRequest())
    const ref = db.collection("motivation")
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
    case FETCH_MOTIVATION_FAILURE:
        return{
            ...state,
            loading:false
        }
    default:
        return state
    }
}
