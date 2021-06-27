import React, { useEffect, useState } from 'react'
import "./styles/conferencePage.scss"
import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { HeartFilled, LoadingOutlined, StopOutlined, VideoCameraFilled } from "@ant-design/icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash, faPhoneSlash, faVideo } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { endRecording, endStreaming, recorodingState, rejoineMeeting, startMeeting, startRecording } from '../../state_mamger/functions/samTv';
import Chats from './chat';
import { notification, Popconfirm, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import { fetchAudience, fetchLikes } from '../../state_mamger/functions/samTvChats';
import TopDisplaybar from './TopDisplaybar';
import { seo } from '../../utils/customPageHeader';
import AlreadyRecordingPrompt from './AlreadyRecordingPrompt';
import CustomSpinner from '../../utils/ui/customSpinner/CustomSpinner';
const config = { mode: "live", codec: "h264" }







const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();



const ConferencePage = ({
  startStreaming,
  rejoinMeeting,
  getLikes,
  getAudience,
  beginRecording,
  chatsInfo,
  stopRecording,
  samTvInfo,
  stopStreaming }) => {

  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [recordingPrompt, setRecordingPrompt] = useState(false)



  useEffect(() => {
    if (client.connectionState === "DISCONNECTED") {
      startStreaming(tracks, ready, client)
    }

    client.on("user-published", () => {
    })
    client.on("user-unpublished", () => {
      notification.warning("Your media devices are offline")
    })
  }, [rejoinMeeting, startStreaming, client, ready, tracks])


  useEffect(() => {
    getAudience()
    getLikes()
    seo({
      title: "SamTv | Live stream",
      metaDescription: "Joined live with Prophet Samson Amoateng"
    })
  }, [getAudience, getLikes])

  return (
    <div className="confrence-room" >
      <AlreadyRecordingPrompt visible={recordingPrompt} onCLose={() => { setRecordingPrompt(false) }} />





      {ready && <AgoraVideoPlayer id="main-video" videoTrack={tracks[1]} >
        <div className="overley  ">
          <div className="top-bar">
            <TopDisplaybar />


          </div>


          <CustomSpinner spinning={false} wrapperClassName="spin" size="large" tip="Loading stream" >
            <div className="content d-flex">



              <div className="control-wrapper">

                <div className="chats">
                  <Chats />
                </div>
                <div className="likes">

                  {chatsInfo.likes.length > 0 && chatsInfo.likes.map(() => <HeartFilled className="like" style={{ color: "red", fontSize: "1rem" }} />)}
                </div>
                <Controls
                  openRecordingPrompt={() => setRecordingPrompt(true)}
                  stopRecording={stopRecording}
                  samTvInfo={samTvInfo}
                  beginRecording={beginRecording}
                  client={client}
                  stopStreaming={stopStreaming}
                  tracks={tracks}
                />
              </div>

            </div>
          </CustomSpinner>
        </div>
      </AgoraVideoPlayer>
      }
    </div>
  )
}


export const Controls = ({
  tracks,
  stopStreaming,
  beginRecording,
  client,
  samTvInfo,
  openRecordingPrompt,
  stopRecording,
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
        div className={`${trackState.audio ? "normal" : "deactivated"} circle `}
        onClick={() => {
          if (tracks) {
            mute("audio")
          }
        }}>
        {trackState.audio ? <FontAwesomeIcon style={{ color: "white" }} icon={faMicrophoneSlash} /> : <FontAwesomeIcon style={{ color: "white" }} icon={faMicrophone} />}
      </div>
      <div div className={`${trackState.video ? "normal" : "deactivated"} circle `} style={{ color: "white" }}
        onClick={() => tracks && mute("video")}>
        <FontAwesomeIcon icon={faVideo} />
      </div>
      <div className="red circle ">
        <Popconfirm
          title="Are you sure you want to end this live session?"
          okText="End live stream"
          onConfirm={() => {
            if (samTvInfo.recordingStatus === recorodingState.recording) {
              openRecordingPrompt()
            } else {
              stopStreaming(tracks, history, client)
            }



          }}


        >
          <FontAwesomeIcon icon={faPhoneSlash} />
        </Popconfirm>
      </div>
      {samTvInfo.recordingStatus === recorodingState.notRecording ? (
        <>
          <Tooltip title="Start recording" >
            <div className="rec circle" >
              <VideoCameraFilled onClick={beginRecording} style={{ fontSize: "1.5rem", color: "red" }} />
            </div>
          </Tooltip>
        </>

      ) : samTvInfo.recordingStatus === recorodingState.loading ? (

        <div className="rec circle" >
          <LoadingOutlined disabled style={{ fontSize: "1.5rem", color: "red" }} />
        </div>

      ) : (
        <>
          <Tooltip title="Stop recording" >
            <div className="rec circle" >
              <StopOutlined onClick={stopRecording} style={{ fontSize: "1.5rem", color: "red" }} />
            </div>
          </Tooltip>
        </>
      )}

    </div>
  );
};
const mapStateToProps = state => {
  return {
    samTvInfo: state.samtv,
    chatsInfo: state.samTvChats,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    startStreaming: (tracks, ready, client) => dispatch(startMeeting(tracks, ready, client)),
    rejoinMeeting: (tracks, history, client) => dispatch(rejoineMeeting(tracks, history, client)),
    stopStreaming: (tracks, history, client) => dispatch(endStreaming(tracks, history, client)),
    getLikes: () => dispatch(fetchLikes()),
    beginRecording: () => dispatch(startRecording()),
    getAudience: () => dispatch(fetchAudience()),
    stopRecording: () => dispatch(endRecording())


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage)

