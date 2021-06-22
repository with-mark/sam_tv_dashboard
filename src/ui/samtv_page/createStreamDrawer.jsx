import { Button, Modal, Form, Image, Input, DatePicker, Spin, message } from 'antd'
import React, { useState } from 'react'
import "./styles/createStreamDrawer.scss"
import logo from "../../assets/images/logo.png"
import { db } from '../../utils/networks/firebaseConfig';
import { liveStreamStatus } from '../../state_mamger/functions/liveStreams';
import { pushNotificationNoImage } from '../../utils/pushNotification';
import { samTvOnly } from '../../utils/permissions';



const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};




const CreateStreamDrawer = ({ visible, onClose }) => {

    const [currentTime, setCurrentTime] = useState(null)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const onFinish = (values) => {
        // console.log(new Date(currentTime).toString().slice(0,25));
        setLoading(true)
        db.collection("liveStreams")
            .add({
                ...values,
                start_time: new Date(currentTime),
                status: liveStreamStatus.Pending,
                timestamp: new Date()

            })
            .then(() => {
                setLoading(false)
                onClose()
                form.resetFields()
                pushNotificationNoImage(`Sam Tv will be live on ${new Date(currentTime).toString().slice(0, 25)}`,
                    `Title: ${values.title} \n Message: ${values.description} `,
                    'sam_tv'
                )
                message.success("Live stream scheduled")

            })
            .catch(err => {
                setLoading(false)
                message.error(`Scheduling live stream failed. Reason: ${String(err)}`)
            })
    }

    return (
        <Modal onCancel={onClose} visible={visible} footer={null}>
            <Spin size="large" spinning={loading} >


                <div className="d-flex justify-content-center">
                    <Image width="70%" id="logo" preview={false} src={logo} />
                </div>
                <div className="header-part text-center">
                    <h5>Schedule Live stream</h5>
                </div>
                <div className="forms">


                    <Form form={form} onFinish={values => {
                        samTvOnly()
                            .then(() => {
                                onFinish(values)
                            }).catch(() => {
                                message.error("Sorry! You do not have samTv permission")
                            })
                    }}  {...formLayout} className="mt-4 form " >
                        <Form.Item name="title" rules={[{ required: true, message: "Title of live stream is required" }]} label="Title" >
                            <Input style={{ width: "100%", height: "45px", borderRadius: "10px" }} placeholder="Ener title of live stream" />
                        </Form.Item>
                        <Form.Item rules={[{ required: true }]} name="description" label="Description" >
                            <Input.TextArea rows="4" style={{ width: "100%", borderRadius: "10px" }} placeholder="Enter brief description of the livestream" />
                        </Form.Item>
                        <Form.Item rules={[{ required: true, message: "Start time is required" }]} name="start_time" label="Start time">
                            <DatePicker style={{ width: "100%", height: "45px", borderRadius: "10px" }} showTime onChange={(_, dateString) => { setCurrentTime(dateString) }} />
                        </Form.Item>
                        <div className="submit">
                            <Button htmlType="submit" shape="round" id="submit-btn"> Schedule live stream</Button>

                        </div>

                    </Form>
                </div>
            </Spin>
        </Modal>
    )
}

export default CreateStreamDrawer
