import React, { useEffect, useState } from 'react'
import "./styles/conferencePage.scss"
import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { WechatOutlined } from "@ant-design/icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash, faPhoneSlash, faVideo } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { rejoineMeeting, startMeeting } from '../../state_mamger/functions/samTv';
import StopStreamingModal from './StopStreamingModal';
import Chats from './chat';
const config = { mode: "live", codec: "h264" }







const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();



const ConferencePage = ({ startStreaming, rejoinMeeting, samTvInfo, chatsInfo}) => {
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const [state, setState] = useState({
    stopMaodal: false
  })

  const closeModal = () => {
    setState({
      ...state,
      stopMaodal: false
    })
  }
  const openModal = () => {
    setState({
      ...state,
      stopMaodal: true
    })
  }

  useEffect(() => {
    if (client.connectionState === "CONNECTED") {
      rejoinMeeting(tracks, client)
    } else if (client.connectionState === "DISCONNECTED") {
      startStreaming(tracks, ready, client)
    }


  }, [rejoinMeeting, startStreaming, client, ready, tracks])




  console.log(samTvInfo);
  return (
    <div className="confrence-room" >
      <StopStreamingModal client={client} tracks={tracks} visible={state.stopMaodal} onClose={closeModal} />




      <div className="content">

        <div className="top-layer">
          <div className="chatsWrapper">


            <div className="chats">
              <Chats/>
            </div>

          </div>

          <div className="control-wrapper">


            {ready && (
              <Controls openModal={openModal} tracks={tracks} />
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
  openModal,
}) => {


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
      {<p style={{ color: "white" }} onClick={openModal}>
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
const mapStateToProps = state => {
  return {
    samTvInfo: state.samtv,
    chatsInfo: state.samTvChats
  }
}
const mapDispatchToProps = dispatch => {
  return {
    startStreaming: (tracks, ready, client) => dispatch(startMeeting(tracks, ready, client)),
    rejoinMeeting: (tracks, cleint) => dispatch(rejoineMeeting(tracks, cleint))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage)

