import React, { useEffect, useState } from 'react'
import "./styles/conferencePage.scss"
import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { WechatOutlined } from "@ant-design/icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash, faPhoneSlash, faVideo } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { endStreaming, rejoineMeeting, startMeeting } from '../../state_mamger/functions/samTv';
import Chats from './chat';
import { message, notification, Popconfirm } from 'antd';
import { useHistory } from 'react-router-dom';
const config = { mode: "live", codec: "h264" }







const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();



const ConferencePage = ({ startStreaming, rejoinMeeting, samTvInfo, chatsInfo, stopStreaming }) => {
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [networkQuality,setNetworkQuality] = useState({
    upload:3,
    download:3
  })


  useEffect(() => {
    if (client.connectionState === "CONNECTED") {
      rejoinMeeting(tracks, client)
    } else if (client.connectionState === "DISCONNECTED") {
      startStreaming(tracks, ready, client)
    }

    client.on("user-published",()=>{
      message.success("Media resources are live")
    })
    client.on("user-unpublished",()=>{
      notification.warning("Your media devices are offline")
    })
    client.on("network-quality",(status)=>{
      setNetworkQuality({
        ...networkQuality,
        upload:status.uplinkNetworkQuality,
        download:status.downlinkNetworkQuality
      })
      
    })


  }, [rejoinMeeting, startStreaming,networkQuality, client, ready, tracks])




  console.log(samTvInfo);
  return (
    <div className="confrence-room" >




      <div className="content">

        <div className="top-layer">
          <div className="chatsWrapper">


            <div className="chats">
              <Chats />
            </div>

          </div>

          <div className="control-wrapper">


            {ready && (
              <Controls client = {client} stopStreaming = {stopStreaming} tracks={tracks} />
            )}
          </div>

        </div>
        {ready && <AgoraVideoPlayer id="main-video" videoTrack={tracks[1]} />
        }

      </div>





    </div>
  )
}


export const Controls = ({
  tracks,
stopStreaming,
client
}) => {

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
      <div className="red circle ">
        <Popconfirm
          title="Are you sure you want to end this live session?"
          okText="End live stream"
          onConfirm={() => {
            stopStreaming(tracks, history, client)


          }}

        >
          <FontAwesomeIcon icon={faPhoneSlash} />
        </Popconfirm>
      </div>
      <div className="normal circle" >
        <WechatOutlined style={{ fontSize: "1.5rem", color: "grey" }} />
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    samTvInfo: state.samtv,
    chatsInfo: state.samTvChats
  }
}
const mapDispatchToProps = dispatch => {
  return {
    startStreaming: (tracks, ready, client) => dispatch(startMeeting(tracks, ready, client)),
    rejoinMeeting: (tracks, history, client) => dispatch(rejoineMeeting(tracks, history, client)),
    stopStreaming: (tracks, history, client) => dispatch(endStreaming(tracks, history, client))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage)

