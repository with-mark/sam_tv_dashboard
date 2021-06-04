import React, { useEffect, useRef, useState } from 'react'
import "./styles/conferencePage.scss"
import { AgoraVideoPlayer,  createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import logo from "../../assets/images/logo.png"
import { Image, message, notification, Spin } from 'antd'
import { tokenA } from '../../utils/networks/agoraConfigs';
import {VideoCameraOutlined} from "@ant-design/icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
const config = {mode: "rtc", codec: "vp8"}

const appId = "c40594061e1f4580aae3b2af1963d01e"
const token = tokenA



const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const ConferencePage = () => {
    const client = useClient();
    const {ready,tracks} = useMicrophoneAndCameraTracks();
    const [users,setUsers] = useState([])
    const mounted = useRef(false)
    const [start,setStart] = useState(false)
    const [inCall,setInCall] = useState(false)


  useEffect(() => {
    let init = async(name)=>{
        console.log(name);
        client.on("user-published",async(user,mediaType)=>{
            client.subscribe(user,mediaType)
            .then(()=>{
                if(mediaType === "video"){
                    setUsers(prevUsers=>[...prevUsers,users])
                }
                if (mediaType === "audio"){
                    user.audioTrack?.play()
                }
            })
            .catch(err=>{
                console.log(err);
            })
           

        })
    }
    client.on("user-unpublished",(user,type)=>{
        if(type ==="video"){
            setUsers((prevUsers) => {
                return prevUsers.filter((User) => User.uid !== user.uid);
              });
        }
    });
    client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
        
      });

      client.join(appId,"casa",token)
      .then(res=>{
        if(tracks) client.publish(tracks).then(
            res=>{
              setStart(true)
              if (ready && tracks) {
                  console.log("init ready");
                  init("casa");
                }
            }
        ).catch(err=>{
            console.log("asd",err);
          notification.error({
              message:String(err)
          })
        })
      })
      .catch(err=>{
          console.log(err);
          if(err.code === "INVALID_OPERATION"){
              setStart(true)
          }else if(err.code === "OPERATION_ABORTED"){
              message.error("Aboqrted")
          }
        notification.error({message:"Hello error",description:String(err)})
      })
  }, [])


  return (
    <div className = "confrence-room" >
            <h2 className="text-light">{ready}</h2>
              <div className="logo">
                <Image id = "logo" preview = {false}  src = {logo}  />
            </div>
            <h3 className="text-light">
                Live Mode
            </h3>
            {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}

{    ready && <AgoraVideoPlayer videoTrack={tracks[1]} style={{height: '400px', width: '400px'}} />
}    </div>
  )
}


export const Controls = ( {
    tracks,
    setStart,
    setInCall
  }) => {
    const client = useClient();
    const history = useHistory()

    const [trackState, setTrackState] = useState({ video: true, audio: true });
  
    const mute = async (type) => {
      if (type === "audio") {
        await tracks[0].setEnabled(!trackState.audio);
        setTrackState((ps) => {
          return { ...ps, audio: !ps.audio };
        });
      } else if (type === "video") {
        await tracks[1].setEnabled(!trackState.video);
        setTrackState((ps) => {
          return { ...ps, video: !ps.video };
        });
      }
    };
  
    const leaveChannel = async () => {
      await client.leave();
      client.removeAllListeners();
      // tracks[0].close();
      // tracks[1].close();
      await tracks[1].setEnabled(false);
      await tracks[0].setEnabled(false);
            tracks[0].close();
      tracks[1].close();
      setStart(false);
      setInCall(false);
      history.push("/sam-tv")
      
    };
  
    return (
      <div className="controls">
        
        <p className={trackState.audio ? "on" : ""}
          onClick={() => mute("audio")}>
          {trackState.audio ?  <FontAwesomeIcon style = {{color:"white"}} icon = {faMicrophoneSlash}  />: <FontAwesomeIcon style = {{color:"white"}} icon = {faMicrophone}  />}
        </p>
        <p style = {{color:"white"}} className={trackState.video ? "on" : ""}
          onClick={() => mute("video")}>
          {trackState.video ? "MuteVideo" : "UnmuteVideo"}
        </p>
        {<p style = {{color:"white"}} onClick={() => leaveChannel()}>Leave</p>}
      </div>
    );
  };

export default ConferencePage

