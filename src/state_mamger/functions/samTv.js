import { message, notification } from "antd"
import {db}  from  "../../utils/networks/firebaseConfig"
import { getAgoraTOken } from "../../utils/networks/agoraConfigs"
const SET_SAMTV_PROGRESS = "SET_SAMTV_PROGRESS"
const INIT_MEETING_REQUEST ="INIT_MEETING_REQUEST"
const INIT_MEETING_COMPLETE = "INIT_MEETING_COMPLETE"
// const UNSET_USER_CONNECTION_UID = "UNSET_USER_CONNECTION_UID"

const appId = "c40594061e1f4580aae3b2af1963d01e"
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



export const endMeeting = (payload)=>{

}



export const leaveChannel = (tracks,history,client)=>dispatch=>{
      const token  = getAgoraTOken()

    client.leave().then(()=>{
        client.removeAllListeners()
        tracks[0].setEnabled(false).then(()=>{
            tracks[0].stop()
            tracks[0].close()
            tracks[1].setEnabled(false).then(()=>{
            tracks[1].stop()
            tracks[1].close()
            
            })
            db.collection("samTv").doc(token).update({
                live:false
            }).then(()=>{
                dispatch(setSamTvProgress(samTvState.offline))
                history.push("/sam-tv")
            })
        


        })
        
        


    }).catch(()=>{
        message.error("Request to end live session failed")
    })
}




export const startMeeting = (tracks,ready,client)=>dispatch=>{
    dispatch(initMeetingRequest())
    const token  = getAgoraTOken()
    if(!tracks && !ready) {
        notification.error({
            message:"Device not found",
            description:"Make sure ur deivce is conneted to a camera and a microphone"
        })

    }else{
        console.log(tracks);
            client.join(appId,channelName,token,null).then(uid=>{
        if(ready && tracks){
            client.setClientRole("host").then(err=>{
                client.publish(tracks).then(res=>{
                    dispatch(setSamTvProgress(samTvState.online))
                    db.collection("samTv").doc(token).set({
                        token,
                        live:true
                    }).then(err=>{
                            message.success("Sam tv is online")
                    })
                    
                   
                })
            })
        }
        
    }).catch(err=>{
        message.error(`Failed to connect to channel. Reason: ${String(err)}`)
        dispatch(initMeetingComplete())
    })
        
    }



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

