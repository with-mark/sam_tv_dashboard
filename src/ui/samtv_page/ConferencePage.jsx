import React, { useEffect, useState } from 'react'
import "./styles/conferencePage.scss"
import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { WechatOutlined } from "@ant-design/icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash, faPhoneSlash, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import { getVideoToken } from '../../utils/agoraFunctions';
import { connect } from 'react-redux';
import { rejoineMeeting, startMeeting } from '../../state_mamger/functions/samTv';
const config = { mode: "live", codec: "h264" }


const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const ConferencePage = ({ startStreaming, rejoinMeeting }) => {
  const token = getVideoToken()
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    if (client.connectionState === "CONNECTED" || client.connectionState === "CONNECTING") {
      rejoinMeeting(tracks, client)
    } else if (client.connectionState === "DISCONNECTED") {
      startStreaming(tracks, ready, client)
    }

  }, [rejoinMeeting, startMeeting, client])





  return (
    <div className="confrence-room" >

      <div className="content">
        {ready && <AgoraVideoPlayer style = {{minWidth:"50%"}} id="main-video" videoTrack={tracks[1]} />
        }
        <div className="chats">

        </div>
      </div>



      <div className="control-wrapper">


        {ready && (
          <Controls tracks={tracks} />
        )}
      </div>

    </div>
  )
}


export const Controls = ({
  tracks,
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
const mapStateToProps = state => {
  return {

  }
}
const mapDispatchToProps = dispatch => {
  return {
    startStreaming: (tracks, ready, client) => dispatch(startMeeting(tracks, ready, client)),
    rejoinMeeting: (tracks, cleint) => dispatch(rejoineMeeting(tracks, cleint))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage)

