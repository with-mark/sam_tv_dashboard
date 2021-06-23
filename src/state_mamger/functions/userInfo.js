import { getUserInfo } from "../../utils/local_storage"
import { db } from "../../utils/networks/firebaseConfig"

const GET_USER_INFO = "GET_USER_INFO"


export const getUserInfoAction=payload=>{
    return{
        type:GET_USER_INFO,
        payload
    }
}

export const fetchUserInfo = ()=>dispatch=>{
    const info = getUserInfo()
    db.collection('userinfo')
    .doc(info.id)
    .get()
    .then(doc=>{
        dispatch(getUserInfoAction({id:doc.id,...doc.data()}))
    })
    
    
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
