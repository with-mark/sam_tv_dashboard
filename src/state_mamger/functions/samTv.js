import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react"
import { message } from "antd"
import { getVideoToken } from "../../utils/agoraFunctions"
import { getAgoraTOken } from "../../utils/networks/agoraConfigs"
const SET_SAMTV_PROGRESS = "SET_SAMTV_PROGRESS"
const INIT_MEETING_REQUEST ="INIT_MEETING_REQUEST"
const INIT_MEETING_COMPLETE = "INIT_MEETING_COMPLETE"
const SET_USER_CONNECTION_UID = "SET_USER_CONNECTION_UID"
const UNSET_USER_CONNECTION_UID = "UNSET_USER_CONNECTION_UID"

const appId = "c40594061e1f4580aae3b2af1963d01e"
const config = { mode: "live", codec: "H.264" }
const channelName = "casa"

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



const initMeetingRequest = ()=>{
    return {
        type:INIT_MEETING_REQUEST
    }
}
const initMeetingComplete =()=>{
    return{
        type:INIT_MEETING_COMPLETE
    }
}

const setUsetConnectionUid= payload=>{
    return{
        type:SET_USER_CONNECTION_UID,
        payload
    }
}
const unsetUserConnectionUid=payload=>{
    return{
        type: UNSET_USER_CONNECTION_UID,
        payload
    }
}


// export const endMeeting = (payload)=>{

// }




export const startMeeting = (tracks,ready,client)=>dispatch=>{
    dispatch(initMeetingRequest())

    client.join(appId,channelName,getAgoraTOken(),null).then(uid=>{
        dispatch(setUsetConnectionUid(uid))
        if(ready && tracks){
            client.setClientRole("host").then(err=>{
                client.publish(tracks).then(res=>{
                    dispatch(setSamTvProgress(samTvState.online))
                    message.success("Sam tv is online")
                })
            })
        }
        
    }).catch(err=>{
        message.error(`Failed to connect to channel. Reason: ${String(err)}`)
        dispatch(initMeetingComplete())
    })


}


export const rejoineMeeting = (tracks,client)=> dispatch=> {
    client.setClientRole("host").then(()=>{
        client.publish(tracks).then(res=>{
            dispatch(setSamTvProgress(samTvState.online))
            message.success("SAM Tv is back online")
        })
    })
}



const initialState = {
    status:samTvState.offline,
    loading:false
}


const samTvReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case SET_SAMTV_PROGRESS:
        return { ...state, 
            status:payload,
        
        }

    default:
        return state
    }
}

export default samTvReducer

