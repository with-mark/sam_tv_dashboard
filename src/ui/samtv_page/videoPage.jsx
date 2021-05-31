import React, { useEffect, useState } from 'react'
import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { Button, notification } from 'antd';
import { tokenA } from '../../utils/networks/agoraConfigs';
import { useHistory } from 'react-router';

const config= {mode: "rtc", codec: "vp8"}
const appId = "c40594061e1f4580aae3b2af1963d01e"
const token = tokenA
console.log(token);
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoPage = () => {
    const history = useHistory()
    const client = useClient();;
    const { ready, tracks } = useMicrophoneAndCameraTracks();
    const [users,setUsers] = useState([])
   
    const [start, setStart] = useState(false);
useEffect(()=>{
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
                  init("channelName");
                }
            }
        ).catch(err=>{
            console.log("asd",err);
          notification.error(err)
        })
      })
      .catch(err=>{
          console.log(err);
        notification.error(err)
      })
},[client,ready,tracks,users])



    return (<>
          {start && tracks ? <AgoraVideoPlayer videoTrack={tracks[1]} style={{height: '60%', width: '100'}} />:<p>gETTING REASDASD</p>}
          <Button onClick= {()=>{client.unpublish(tracks).then(res=>{
            //   history.push("/sam-tv")
             
          }) }} >Close</Button>

    </>
    
    )}
export default VideoPage
