import { Button, Drawer, Image, Tag,Spin, message } from 'antd'
import React, { useState } from 'react'
import "./styles/createStreamDrawer.scss"
import "./styles/detailed.scss"
import logo from  "../../assets/images/logo.png"
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { db } from '../../utils/networks/firebaseConfig'
import { liveStreamStatus } from '../../state_mamger/functions/liveStreams'
  
const DetailedStreamDrawer = ({visible,onClose,stream}) => {
    const history = useHistory() 
    const [loading,setLoading] = useState(false)

    const onCLick = ()=>{
        if(stream.status === liveStreamStatus.Completed){
            message.error("You stream has already ended")
            return;
        }
        setLoading(true)
        db.collection("liveStreams")
        .doc(stream.id).update({
            status:liveStreamStatus.Completed
        }).then(()=>{
            setLoading(false)
            onClose()
            history.push("/sam-tv/live")
        }).catch(err=>{
            setLoading(false)
            message.error(`Error occured, try again later`)
            throw(err)

        })
        

    }
    console.log(stream);
    return (
        <Drawer onClose = {onClose} visible = {visible} width = {400} >
            <Spin spinning={loading} size = "large" >

            
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
                disabled = {stream.status === liveStreamStatus.Completed}
                        onClick={onCLick}
                shape = "round" id = "submit-btn" >Start</Button>

                </div>
            </Row>
            
            </Spin>
        </Drawer>
    )
}

export default DetailedStreamDrawer
