import { message, notification } from "antd"
import {db}  from  "../../utils/networks/firebaseConfig"
import { deleteSamTvToken, getLocalAgoraToken, getStreanUid, setRecordingResourceId, setRecordingSid, setStreamUid } from "../../utils/local_storage"
import { getVideoToken } from "../../utils/agoraFunctions"
import pushNotification from "../../utils/pushNotification"
import axios from "axios"
import { startStreamRecordingPath } from "../../utils/networks/endpoints"

const SET_SAMTV_PROGRESS = "SET_SAMTV_PROGRESS"
const INIT_MEETING_REQUEST ="INIT_MEETING_REQUEST"
const INIT_MEETING_COMPLETE = "INIT_MEETING_COMPLETE"

const SEND_RECORDING_REQUEST = "SEND_RECORDING_REQUEST"
const SEND_RECORDING_COMPLETED = "SEND_RECORDING_COMPLETED"

const appId = "c40594061e1f4580aae3b2af1963d01e"
const channelName = "casa"





const startRecordingRequest = ()=>{
    return {
        type:SEND_RECORDING_REQUEST
    }
}
const startRecordingCompleted=()=>{
    return {
        type:SEND_RECORDING_COMPLETED
    }
}


export const startRecording =()=>dispatch=>{
    dispatch(startRecordingRequest())
    const data = {
        cname:channelName,
        token:getLocalAgoraToken(),
        uid:getStreanUid()
    }

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    axios.post(startStreamRecordingPath,data,config)
    .then(res=>{
        const {sid,resourceId} = res.body
        setRecordingResourceId(resourceId)
        setRecordingSid(sid)
        dispatch(startRecordingCompleted())
    }).catch(err=>{
        dispatch(startRecordingCompleted())
        if(err.response){
                notification.error({
                message:"Recording reuest failed",
                description:err.response.data.detail
            })

        }else if(err.request){
            notification.error({
                message:"Network error",
                description:"Check internet connection"
            })
        }
 
    })
}


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



export const endMeeting = (payload)=>{

}



export const endStreaming = (tracks,history,client)=>dispatch=>{
      const token  = getLocalAgoraToken()
      if(!token){
          
      }

    client.leave().then(()=>{
        client.removeAllListeners()
        tracks[0].setEnabled(false).then(()=>{
            tracks[0].stop()
            tracks[0].close()
            tracks[1].setEnabled(false).then(()=>{
            tracks[1].stop()
            tracks[1].close()
            
            })
            db.collection("samTv").doc("agoraToken").set({
                token:null,
                live:false
            }).then(()=>{
                dispatch(setSamTvProgress(samTvState.offline))
                deleteSamTvToken()
                pushNotification( "Sam Tv Livestream just ended","","sam_tv")   
                message.success("You have successfully ended the live session")
                history.push("/sam-tv")
            })
        


        })
        
        


    }).catch(()=>{
        message.error("Request to end live session failed")
    })
}



export const startMeeting = (tracks,ready,client)=>dispatch=>{
    dispatch(initMeetingRequest())
    getVideoToken().then(token=>{
    if(!tracks && !ready) {
        notification.error({
            message:"Device not found",
            description:"Make sure ur deivce is conneted to a camera and a microphone"
        })

    }else{
            client.join(appId,channelName,token,null).then(uid=>{
                setStreamUid(uid)
        if(ready && tracks){
            client.setClientRole("host").then(()=>{
                client.publish(tracks).then(res=>{
                    console.log(res);
                    pushNotification( "SamTv is live with Pastor Sam Amoateng","","sam_tv")   
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

    })




}


export const rejoineMeeting = (tracks,client)=> dispatch=> {
    client.setClientRole("host").then(()=>{
        client.publish(tracks).then(res=>{
            dispatch(setSamTvProgress(samTvState.online))
        })
    })
}



const initialState = {
    status:samTvState.offline,
    loading:false,
    curStream:null,
    loadingRecording:false,
}


const samTvReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case SET_SAMTV_PROGRESS:
        return { ...state, 
            status:payload,
        
        }

    case SEND_RECORDING_REQUEST:
        return{
            ...state,
            loadingRecording:true
        }
    case SEND_RECORDING_COMPLETED:
        return{
            ...state,
            loadingRecording:false
        }

    default:
        return state
    }
}

export default samTvReducer

