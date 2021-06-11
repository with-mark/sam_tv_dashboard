import React from 'react'
import { Modal, Button } from 'antd'
import { connect } from 'react-redux'
import { endStreaming } from '../../state_mamger/functions/samTv'
import { useHistory } from 'react-router-dom'
import { Row, Col } from "react-bootstrap"

const StopStreamingModal = ({ visible, onClose, tracks, client, stopStreaming }) => {
    const history = useHistory()
    const onStop = () => {
        onClose()
        stopStreaming(tracks, history, client)


    }

    return (
        <Modal onOk={onStop} onCancel={() => {
            console.log("asdasdasda");
            onClose()}} visible={visible} footer={null} >
            Are you sure you want to end the live stream session?

            <Row className="mt-3" >
                <Col>
                    <Button onClick = {()=>{
                        console.log("dasdasd");
                        console.log("adsdasd");
                    }} style={{ background: "red", color: "#ffffff" }} shape="round" > End streaming </Button>
                </Col>
                <Col>
                    <Button onClick = {onClose} style={{ borderColor: "red", color: "red" }} shape="round"> Cancel </Button>
                </Col>
            </Row>

        </Modal>
    )
}


const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => {
    return {
        stopStreaming: (tracks, history, client) => dispatch(endStreaming(tracks, history, client))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(StopStreamingModal)
