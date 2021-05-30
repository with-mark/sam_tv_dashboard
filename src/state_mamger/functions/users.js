
const SIGN_UP_REQUEST = "SIGN_UP_REQUEST"
const SIGN_UP_SUCCESS = "SIGN_UP_COMPLETED"

const signUpReques = ()=>{
    return {
        type:SIGN_UP_REQUEST
    }
}

const signUpCompleted= ()=>{
    return {
        type:SIGN_UP_SUCCESS
    }
}



const initialState = {
    signUpLoading:false,
    data:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case SIGN_UP_REQUEST:
        return { ...state, signUpLoading:true }
    
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpLoading:false
            }
    default:
        return state
    }
}
