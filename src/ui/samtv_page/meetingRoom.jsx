import { Button, Image } from 'antd'
import React from 'react'
import "./styles/meeting_room.scss"
import logo from "../../assets/images/logo.png"
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const MeetingRoom = () => {
    return (
        <div className = "meeting-room" >
            <div className="logo">
                <Image id = "logo" preview = {false}  src = {logo}  />
            </div>
            <h3 className="text-light">
                Meeting Room
            </h3>
            <Row className = "mt-4" >
                <Col xs = "6" >
                <Link to = "/sam-tv/live" >
                <Button shape = "round" id = "startStream" >Start Stream</Button>

                </Link>
                </Col>
                <Col xs = "6" >
                <Link to = "/sam-tv/schedules" >
                <Button shape = "round" id = "scheduleStream" >Schedule Live Stream</Button>

                </Link>

                </Col>
            </Row>
        </div>
    )
}

export default MeetingRoom
