const SET_SAMTV_PROGRESS = "SET_SAMTV_PROGRESS"

export const samTvState= {
    offline:"offline",
    online:"online"
}


export const setSamTvProgress=status=>{
    return {
        type:SET_SAMTV_PROGRESS,
        payload:status
    }
}




const initialState = {
    status:samTvState.offline
}


const samTvReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case SET_SAMTV_PROGRESS:
        return { ...state, 
            status:payload
        }

    default:
        return state
    }
}

export default samTvReducer

