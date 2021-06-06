import React, { useEffect, useState } from 'react'
import "./styles/conferencePage.scss"
import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { WechatOutlined } from "@ant-design/icons"
import { message, notification } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash, faPhoneSlash, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import { getVideoToken } from '../../utils/agoraFunctions';
const config = { mode: "rtc", codec: "vp8" }

const appId = "c40594061e1f4580aae3b2af1963d01e"



const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const ConferencePage = () => {
  const token = getVideoToken()
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [users, setUsers] = useState([])
  const [start, setStart] = useState(false)
  const [inCall, setInCall] = useState(false)


  useEffect(() => {
    let init = async (name) => {
      console.log(name);
      client.on("user-published", async (user, mediaType) => {
        client.subscribe(user, mediaType)
          .then(() => {
            if (mediaType === "video") {
              setUsers(prevUsers => [...prevUsers, users])
            }
            if (mediaType === "audio") {
              user.audioTrack?.play()
            }
          })
          .catch(err => {
            console.log(err);
          })


      })
    }
    client.on("user-unpublished", (user, type) => {
      if (type === "video") {
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

    client.join(appId, "casa", token)
      .then(res => {
        if (tracks) client.publish(tracks).then(
          res => {
            setStart(true)
            if (ready && tracks) {
              console.log("init ready");
              init("casa");
            }
          }
        ).catch(err => {
          console.log("asd", err);
          notification.error({
            message: String(err)
          })
        })
      })
      .catch(err => {
        console.log(err);
        if (err.code === "INVALID_OPERATION") {
          setStart(true)
        } else if (err.code === "OPERATION_ABORTED") {
          message.error("Aborted")
        }
        notification.error({ message: "Hello error", description: String(err) })
      })
  }, [client,tracks,start,inCall,ready,token,users])


  return (
    <div className="confrence-room" >

          <div className="content">
        {ready && <AgoraVideoPlayer id="main-video" videoTrack={tracks[1]} />
        }
        <div className="chats">

        </div>
          </div>

      
    
      <div className="control-wrapper">


        {ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
        )}
      </div>

    </div>
  )
}


export const Controls = ({
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

      <div
        div className="normal circle "
        onClick={() => mute("audio")}>
        {trackState.audio ? <FontAwesomeIcon style={{ color: "white" }} icon={faMicrophoneSlash} /> : <FontAwesomeIcon style={{ color: "white" }} icon={faMicrophone} />}
      </div>
      <div div className="normal circle " style={{ color: "white" }}
        onClick={() => mute("video")}>
        <FontAwesomeIcon icon={faVideo} />
      </div>
      {<p style={{ color: "white" }} onClick={() => leaveChannel()}>
        <div className="red circle ">
          <FontAwesomeIcon icon={faPhoneSlash} />
        </div>
      </p>}
      <div className="normal circle" >
        <WechatOutlined style={{ fontSize: "1.5rem", color: "grey" }} />
      </div>
    </div>
  );
};

export default ConferencePage

