import React, { useEffect, useState } from 'react'
import "./styles/conferencePage.scss"
import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { VideoCameraFilled} from "@ant-design/icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash, faPhoneSlash, faVideo } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { endStreaming, rejoineMeeting, startMeeting, startRecording } from '../../state_mamger/functions/samTv';
import Chats from './chat';
import { notification, Popconfirm, Spin} from 'antd';
import { useHistory } from 'react-router-dom';
import { deleteAllChats, fetchLikes } from '../../state_mamger/functions/samTvChats';
import TopDisplaybar from './TopDisplaybar';
import { seo } from '../../utils/customPageHeader';
const config = { mode: "live", codec: "h264" }







const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();



const ConferencePage = ({
  startStreaming,
  rejoinMeeting,
  getLikes,
  deleteChats,
  beginRecording,
  stopStreaming }) => {

  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  // const [networkQuality, setNetworkQuality] = useState({
  //   upload: 3,
  //   download: 3
  // })



  useEffect(() => {
    if (client.connectionState === "DISCONNECTED") {
      startStreaming(tracks, ready, client)
    }

    client.on("user-published", () => {
      // message.success("Media resources are live")
    })
    client.on("user-unpublished", () => {
      notification.warning("Your media devices are offline")
    })
    // client.on("network-quality", (status) => {
    //   setNetworkQuality({
    //     ...networkQuality,
    //     upload: status.uplinkNetworkQuality,
    //     download: status.downlinkNetworkQuality
    //   })

    // })
    getLikes()

  }, [rejoinMeeting, startStreaming, client, ready, tracks, getLikes])


  useEffect(() => {
    seo({
      title: "SamTv | Live stream",
      metaDescription: "Joined live with Prophet Samson Amoateng"
    })
  }, [])

  // console.log(samTvInfo);
  return (
    <div className="confrence-room" >





        {ready && <AgoraVideoPlayer id="main-video" videoTrack={tracks[1]} >
          <div className="overley  ">
            <div className="top-bar">
              <TopDisplaybar />


            </div>


            <Spin spinning={false} wrapperClassName="spin" size="large" tip="Loading stream" >
              <div className="content d-flex">

              

                <div className="control-wrapper">
                <div className="chats">
                  <Chats />
                </div>

                  <Controls beginRecording={beginRecording} deleteChats={deleteChats} client={client} stopStreaming={stopStreaming} tracks={tracks} />
                </div>
             
              </div>
            </Spin>
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
  deleteChats
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
            stopStreaming(tracks, history, client)
            deleteChats()


          }}


        >
          <FontAwesomeIcon icon={faPhoneSlash} />
        </Popconfirm>
      </div>
      <div className="rec circle" >
        <VideoCameraFilled onClick = {beginRecording} style = {{ fontSize: "1.5rem", color: "red" }} />
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
    stopStreaming: (tracks, history, client) => dispatch(endStreaming(tracks, history, client)),
    deleteChats: () => dispatch(deleteAllChats()),
    getLikes: () => dispatch(fetchLikes()),
    beginRecording: () => dispatch(startRecording())


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage)

