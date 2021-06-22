import { Button, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import "./styles/meeting_room.scss"
import logo from "../../assets/images/logo.png"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { samTvState } from '../../state_mamger/functions/samTv'
import StartMeetingFormModal from './startMeetingFormModal'
import { seo } from '../../utils/customPageHeader'


const MeetingRoom = ({ samTvInfo }) => {
    const [startModal,setStartModal] = useState(false)
    useEffect(() => {
        seo({
            title: "SamTv | Meeting room",
            metaDescription: "Start instant live stream"
        })
    }, [])


    return (
        <div className="meeting-room" >
            <StartMeetingFormModal visible={startModal} onClose = {()=>{setStartModal(false)}} />
            <div className="logo">
                <Image id="logo" preview={false} src={logo} />
            </div>
            <h3 className="text-light">
                Meeting Room
            </h3>
            <div style={{ border: `1px dashed ${samTvInfo.status === samTvState.offline ? "red" : "green"}` }} className="status">
                <h4 className={samTvInfo.status === samTvState.offline ? "text-danger p-3 " : "text-success p-3"} >{samTvInfo.status === samTvState.offline ? "Sam Tv is Offline" : "Sam Tv is online"}</h4>
            </div>
            <div className="d-sm-flex mt-2 justify-content-center " >
                <div className="my-1 mx-2">

                    {samTvInfo.status === samTvState.offline ? (
                        <Button onClick = {()=>{setStartModal(true)}} shape="round" id="startStream" >Start Stream</Button>

                   ) : (<Link to="/sam-tv/live" >
                        <Button shape="round" id="startStream" >Rejoin Meeting </Button>

                    </Link>)}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        samTvInfo: state.samtv
    }
}

export default connect(mapStateToProps)(MeetingRoom)
