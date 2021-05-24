import {fetchFireStoreItems} from "../../utils/networks/firestore_services"
const FETCH_MOTIVATION_REQUEST = "FETCH_MOTIVATION_REQUEST"
const FETCH_MOTIVATION_SUCCESS = "FETCH_MOTIVATION_SUCCESS"

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




export const fetchMotivations =()=>async dispatch=>{
   dispatch(fetchMotivationRequest())
    const motivations = await fetchFireStoreItems("motivation")
    dispatch(fetchMotivationSuccess(motivations))   
}





const initialState = {
loading:false,
motivations:[]
}


export const motivationReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_MOTIVATION_REQUEST:
        return { ...state, loading:true }

    case FETCH_MOTIVATION_SUCCESS:
        return{
            ...state,
            loading:false,
            motivations:payload
        }
  
    default:
        return state
    }
}
