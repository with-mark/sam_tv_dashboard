import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Form, Input ,Button,Spin, notification} from 'antd'
import React, { useState } from 'react'
import { getLocalAgoraToken, setStreamUid } from '../../utils/local_storage';
import { db } from '../../utils/networks/firebaseConfig';
import "./styles/livestreamModal.scss"
import {v4} from "uuid"
import { useHistory } from 'react-router-dom';


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 },
};
const StartMeetingFormModal = ({ visible, onClose }) => {
    const [form] = Form.useForm()
    const history = useHistory()
    const [loading,setLoading] = useState(false)


    const onFinish=values=>{
        console.log(values);
        setLoading(true)
        const uid = v4()
        const token = getLocalAgoraToken()
        db.collection("liveStream").add({
            ...values,
            timestamp: new Date(),
            token,
            status:"pending",
            uid
        })
        .then(()=>{
            setLoading(false)
            setStreamUid(uid)
            onClose()
            history.push("/sam-tv/live")
        }).catch(err=>{
            setLoading(false)
            notification.error({
                message:"Preparing live stream failed",
                description:String(err)
            
            })

        })
    }


    return (
        <Modal visible={visible} onCancel={onClose} footer={null} >
            <Spin tip="Preparing live stream"  spinning = {loading} >
            <div className="text-center my-4">
                <h5>Live stream information</h5>
            </div>
            <Form
                onFinish={onFinish}
            {...layout} form={form} >
                <Form.Item label="Title" name="title" rules={[{ required: true, message: "Live stream title is required" }]} >
                    <Input style = {{height:"45px",borderRadius:"10px"}} />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Live stream description is required" }]} >
                    <Input.TextArea style={{borderRadius: "10px" }} rows="8" />
                </Form.Item>
                <div className="submit-btn">
                    <Button disabled = {loading} icon = {<FontAwesomeIcon className = "mx-1" icon = {faVideo} />} shape = "round" htmlType = "submit" id= "submitBTn" >Start Stream</Button>
                </div>

            </Form>
            </Spin>
        </Modal>
    )
}

export default StartMeetingFormModal