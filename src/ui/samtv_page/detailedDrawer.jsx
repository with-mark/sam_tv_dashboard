import { Button, Drawer, Image, Tag } from 'antd'
import React from 'react'
import "./styles/createStreamDrawer.scss"
import "./styles/detailed.scss"
import logo from  "../../assets/images/logo.png"
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
  
const DetailedStreamDrawer = ({visible,onClose,stream}) => {
    const history = useHistory()
    return (
        <Drawer onClose = {onClose} visible = {visible} width = {400} >
            <div className="logo">
                <Image id = "logo" preview ={false} src = {logo} />
            </div>
            <div className="header-part text-center">
                <h6>{stream.title}</h6>
            </div>

            <Row className = "mt-5" >
                <Col xs = "8" >
                    Start time: Sat 12 Aug 2020
                </Col>
                <Col>
                    <Tag  color = {stream.status ==="pending" ? "yellow":stream.status ==="in_session"?"green":"red"} >{stream.status}</Tag>
                </Col>
                <Col xs = "12" className = "mt-3" >
                   {stream.description}
                </Col>
                <div className="submit mt-5">
                <Button 
                onClick = {()=>{
                    
                    history.push("/sam-tv/conference")
                    onClose()
                }}
                shape = "round" id = "submit-btn" >Start</Button>

                </div>
            </Row>
            
            
        </Drawer>
    )
}

export default DetailedStreamDrawer
