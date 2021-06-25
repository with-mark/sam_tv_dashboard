import { message, notification } from "antd"
import {db}  from  "../../utils/networks/firebaseConfig"
import { deleteRecordingResourceId, deleteRecordingSid, deleteSamTvToken, deleteStreamUid, getLocalAgoraToken, getRecordingResourceId, getRecordingSid, getStreanUid, setRecordingResourceId, setRecordingSid, setStreamUid } from "../../utils/local_storage"
import { getVideoToken } from "../../utils/agoraFunctions"
import pushNotification from "../../utils/pushNotification"
import axios from "axios"
import { startStreamRecordingPath, stopStreamRecordingPath } from "../../utils/networks/endpoints"
import { deleteAllAudience, deleteAllChats, deleteAllLikes } from "./samTvChats"

const SET_SAMTV_PROGRESS = "SET_SAMTV_PROGRESS"
const INIT_MEETING_REQUEST ="INIT_MEETING_REQUEST"
const INIT_MEETING_COMPLETE = "INIT_MEETING_COMPLETE"

const SEND_RECORDING_REQUEST = "SEND_RECORDING_REQUEST"
const SEND_RECORDING_COMPLETED = "SEND_RECORDING_COMPLETED"

const END_RECORDING_REQUEST = "END_RECORDING_REQUEST"
const END_RECORDING_SUCCESS = "END_RECORDING_SUCCESS"
const END_RECORDING_FALILED = "END_RECORDING_FALILED"

const appId = "c40594061e1f4580aae3b2af1963d01e"
const channelName = "casa"

export const recorodingState = {
    loading:"loading",
    recording:"recording",
    notRecording:"not_recording"
}




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



const endRecordingRequest=()=>{
    return{
        type: END_RECORDING_REQUEST
    }
}

const endRecordingSuccess=()=>{
    return{
        type:END_RECORDING_SUCCESS
    }
}

const endRecordingFailed=()=>{
    return{
        type: END_RECORDING_FALILED
    }
}


export const startRecording =()=>async dispatch=>{
    dispatch(startRecordingRequest())
    const token  = await  getVideoToken() 
    const data = {
        cname:channelName,
        token,
        uid:String(getStreanUid())
    }

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    axios.post(startStreamRecordingPath,data,config)
    .then(res=>{
        console.log(res.data);
        const {sid,resourceId} = res.data.data
        setRecordingResourceId(resourceId)
        setRecordingSid(sid)
        dispatch(startRecordingCompleted())
        message.success("Recording has began")
    }).catch(err=>{
        dispatch(startRecordingCompleted())
        if(err.response){
            console.log(err.response);
                notification.error({
                message:"Recording reuest failed",
                description:err.response.data.detatil
            })

        }else if(err.request){
            notification.error({
                message:"Network error",
                description:"Check internet connection"
            })
        }
 
    })
}




export const endRecording=()=>dispatch=>{
        const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    dispatch(endRecordingRequest())
    const data = {
        cname:"casa",
        uid:String(getStreanUid()),
        sid:getRecordingSid(),
        resourceId:getRecordingResourceId()

    }
    console.log("Casa");
    axios.post(stopStreamRecordingPath,data,config)
    .then(res=>{
        console.log(res);
        deleteRecordingResourceId()
        deleteRecordingSid()
        dispatch(endRecordingSuccess())
        message.success("Recorded Ended succesfully")
    }).catch((err)=>{
        dispatch(endRecordingFailed())
        if(err.response){
            console.log(err.response);
            message.error(`Ending live recording failed! \n  Reason: ${String(err.response.data.detail)}`)
        }
        else if(err.request){
            notification.error({
                message:"Network error",
                description:"Check internet connection and try again"
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
                deleteAllAudience()
                deleteAllLikes()
                deleteAllChats()
                deleteStreamUid()
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
            const uid = 393939
            setStreamUid(uid)
            client.join(appId,channelName,token,uid).then(uid=>{
                setStreamUid(uid)
        if(ready && tracks){
            client.setClientRole("host").then(()=>{
                client.publish(tracks).then(res=>{
                    pushNotification( "SamTv is live with Prophet Samuel Amoateng","","sam_tv")   
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
    recordingStatus:recorodingState.notRecording,
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
            recordingStatus:recorodingState.loading
        }
    case SEND_RECORDING_COMPLETED:
        return{
            ...state,
            recordingStatus:recorodingState.recording
        }
    case END_RECORDING_REQUEST:
        return{
            ...state,
            recordingStatus:recorodingState.loading
        }
    case END_RECORDING_SUCCESS:
        return{
            ...state,
            recordingStatus:recorodingState.notRecording
        }
    case END_RECORDING_FALILED:
        return{
            ...state,
            recordingStatus:recorodingState.recording
        }

    default:
        return state
    }
}

export default samTvReducer

