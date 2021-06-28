import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Form, Input, Button, notification, message } from 'antd'
import React, { useState } from 'react'
import { db } from '../../utils/networks/firebaseConfig';
import "./styles/livestreamModal.scss"
import { useHistory } from 'react-router-dom';
import { samTvOnly } from '../../utils/permissions';
import CustomSpinner from '../../utils/ui/customSpinner/CustomSpinner';


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 },
};
const StartMeetingFormModal = ({ visible, onClose }) => {
    const [form] = Form.useForm()
    const history = useHistory()
    const [loading, setLoading] = useState(false)


    const onFinish = values => {
        console.log(values);
        setLoading(true)
        db.collection("samTv")
            .doc('agoraToken')
            .set({
                ...values,
                timestamp: new Date(),
                token: null,
                live: false,
                status: "pending",
            })
            .then(() => {
                setLoading(false)
                onClose()
                history.push("/sam-tv/live")
            }).catch(err => {
                setLoading(false)
                notification.error({
                    message: "Preparing live stream failed",
                    description: String(err)

                })

            })
    }


    return (
        <Modal visible={visible} onCancel={onClose} footer={null} >
            <CustomSpinner tip="Preparing live stream" spinning={loading} >
                <div className="text-center my-4">
                    <h5>Live stream information</h5>
                </div>
                <Form
                    onFinish={values => {
                        samTvOnly()
                            .then(() => {
                                onFinish(values)
                            }).catch(() => {
                                message.error("Sorry! You do not have samTv permissions")
                            })

                    }}
                    {...layout} form={form} >
                    <Form.Item label="Title" name="title" rules={[{ required: true, message: "Live stream title is required" }]} >
                        <Input style={{ height: "45px", borderRadius: "10px" }} />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: true, message: "Live stream description is required" }]} >
                        <Input.TextArea style={{ borderRadius: "10px" }} rows="8" />
                    </Form.Item>
                    <div className="submit-btn">
                        <Button disabled={loading} icon={<FontAwesomeIcon className="mx-1" icon={faVideo} />} shape="round" htmlType="submit" id="submitBTn" >Start Stream</Button>
                    </div>

                </Form>
            </CustomSpinner>
        </Modal>
    )
}

export default StartMeetingFormModal
