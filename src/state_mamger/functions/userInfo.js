import { getUserInfo } from "../../utils/local_storage"

const GET_USER_INFO = "GET_USER_INFO"


const getUserInfoAction=payload=>{
    return{
        type:GET_USER_INFO,
        payload
    }
}

export const fetchUserInfo = ()=>dispatch=>{
    const info = getUserInfo()
    dispatch(getUserInfoAction(info))
}

const initialState = {
    email:''

}

const userInfoReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case GET_USER_INFO:
        return { ...state, ...payload }

    default:
        return state
    }
}

export default userInfoReducer
