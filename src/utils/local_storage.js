const setItem = (key,item)=>{
    localStorage.setItem(key,JSON.stringify(item))
}

const deleteItem = key=>{
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.log(error);
        
    }
}

const getItem =key=>{
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (error) {
        return null
        
    }
}

//Auth token stores the jwt token for the authenticated user
export const setAuthToken = token=>{
    setItem("authToken",token)
}

export const getAuthToken = ()=>{
    return getItem("authToken");
    
}

export const deleteAuthToken = ()=>{
    deleteItem("authToken")
}


//IsAuth is boolean that shows the authenticated status of the current user
export const setIsAuth = status=>{
    setItem("isAuth",status)
}

export const getIsAuth = ()=>{
    const status = getItem("isAuth")
    return false ? status === null:status;
}


//Store authenticated user information

export const setUserInfo= userInfo=>{
    setItem("userInfo",userInfo)
}

export const getUserInfo= ()=>{
    return getItem("userInfo");
}

export const deleteUserInfo= ()=>{
    deleteItem("userInfo")
}


export const setAgoraToken =token=>{
    setItem("agoraToken",token)
}

export const getLocalAgoraToken = ()=>{
    return getItem("agoraToken")
}

export const deleteSamTvToken = ()=>{
    deleteItem("agoraToken")
}

export const setVideoToken = token=>{
    setItem("authToken",token)
}

export const getToken = ()=>{
    return getItem("authToken")
}

export const delteToken =()=>{
    deleteItem("authToken")
}

export const setSamTvStatus=status=>{
    setItem("samTvStatus",status)
}

export const getSamTvStatus=()=>{
    return getItem("samTvStatus")
}

export const setStreamUid=uid=>{
    setItem("streamUid",uid)
}

export const getStreanUid =()=>{
    return getItem("streamUid")
}

export const deleteStreamUid=()=>{
    deleteItem("streamUid")
}

export const setRecordingSid = (sId)=>{
    setItem("recordingSid",sId)
}

export const setRecordingResourceId = (resourseId)=>{
    setItem("resourseId",resourseId)
}

export const getRecordingSid = ()=>{
    return getItem("recordingSid")
}

export const getRecordingResourceId=()=>{
    return getItem("resourseId")
}

export const deleteRecordingSid = ()=>{
    return deleteItem("recordingSid")
}

export const deleteRecordingResourceId=()=>{
    return deleteItem("resourseId")
}


