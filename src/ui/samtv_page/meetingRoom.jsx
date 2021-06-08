import { Button, Image } from 'antd'
import React from 'react'
import "./styles/meeting_room.scss"
import logo from "../../assets/images/logo.png"
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { samTvState } from '../../state_mamger/functions/samTv'
const MeetingRoom = ({ samTvInfo }) => {

    return (
        <div className="meeting-room" >
            <div className="logo">
                <Image id="logo" preview={false} src={logo} />
            </div>
            <h3 className="text-light">
                Meeting Room
            </h3>
            <div style={{ border: `1px dashed ${samTvInfo.status === samTvState.offline ? "red" : "green"}` }} className="status">
                <h4 className={samTvInfo.status === samTvState.offline ? "text-danger p-3 " : "text-success p-3"} >{samTvInfo.status === samTvState.offline ? "Sam Tv is Offline" : "Sam Tv is online"}</h4>
            </div>
            <Row className="mt-4" >
                <Col xs="6" >

                    {samTvInfo.status === samTvState.offline ? (<Link to="/sam-tv/live" >
                        <Button shape="round" id="startStream" >Start Stream</Button>

                    </Link>) : (<Link to="/sam-tv/live" >
                        <Button shape="round" id="startStream" >Rejoin Meeting </Button>

                    </Link>)}
                </Col>
                <Col xs="6" >
                    <Link to="/sam-tv/schedules" >
                        <Button shape="round" id="scheduleStream" >Schedule Live Stream</Button>

                    </Link>

                </Col>
            </Row>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        samTvInfo: state.samtv
    }
}

export default connect(mapStateToProps)(MeetingRoom)
