import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Form, Input ,Button} from 'antd'
import React from 'react'
import "./styles/livestreamModal.scss"

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 },
};
const StartMeetingFormModal = ({ visible, onClose }) => {
    const [form] = Form.useForm()
    return (
        <Modal visible={visible} onCancel={onClose} footer={null} >
            <div className="text-center my-4">
                <h5>Live stream information</h5>
            </div>
            <Form {...layout} form={form} >
                <Form.Item label="Title" name="title" rules={[{ required: true, message: "Live stream title is required" }]} >
                    <Input style = {{height:"45px",borderRadius:"10px"}} />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Live stream description is required" }]} >
                    <Input.TextArea style={{borderRadius: "10px" }} rows="8" />
                </Form.Item>
                <div className="submit-btn">
                    <Button icon = {<FontAwesomeIcon className = "mx-1" icon = {faVideo} />} shape = "round" htmlType = "submit" id= "submitBTn" >Start Stream</Button>
                </div>

            </Form>

        </Modal>
    )
}

export default StartMeetingFormModal
