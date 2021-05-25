import React, { useCallback, useEffect, useState } from 'react'
import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { notification } from 'antd';

const config= {mode: "rtc", codec: "vp8"}
const appId = "c40594061e1f4580aae3b2af1963d01e"
const token = "006c40594061e1f4580aae3b2af1963d01eIACs5pUkwzNmzNFgEohITA4FPNZKeyHSByKBIzh0fxeRPhhIE+YAAAAAEAA7EFxEM5qtYAEAAQAzmq1g"

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const SamTvPage = () => {
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
      
      client.join(appId,"asdasdasd",token,client.uid)
      .then(res=>{
          client.setClientRole("host")
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
                notification.error(err)
              })
            
          }).catch(err=>{
            notification.error(err)
          })
          
      })
      .catch(err=>{
        notification.error(err)
      })
},[client,ready,tracks,users])



    return (
      start && tracks ? <AgoraVideoPlayer videoTrack={tracks[1]} style={{height: '40%', width: '40%'}} />:<p>gETTING REASDASD</p>
    
    )}
export default SamTvPage
