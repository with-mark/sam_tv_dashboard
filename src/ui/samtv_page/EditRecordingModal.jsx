import { Modal, Image, Form, Input, Button, message, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import logo from "../../assets/images/logo.png"
import { db } from '../../utils/networks/firebaseConfig';
import { samTvOnly } from '../../utils/permissions';
import CustomSpinner from '../../utils/ui/customSpinner/CustomSpinner';



const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 24 },
};

const EditMotivationModal = ({ visible, onClose, recording }) => {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        title: '',
        description: ''
    })

    const onChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }



    const [form] = useForm()
    const onFinish = () => {
        samTvOnly()
            .then(() => {
                setLoading(true)
                db.collection('liveRecordings')
                    .doc(recording.id)
                    .update({
                        title: values.title || recording.title,
                        description: values.description || recording.description
                    }).then(() => {
                        setLoading(false)
                        form.resetFields()
                        onClose()
                        message.success("You have successfully updated the live stream")


                    }).catch((err) => {
                        console.log(err);
                        notification.error({
                            message:"Updating live recording failed",
                            description:"Unexpected error occured"
                        })


                    })
            })
            .catch(() => {
                message.error("Sorry!, you do not have sam tv permission")
            })


    }

    return (
        <Modal visible={visible} onCancel={onClose} footer={null}>
            <CustomSpinner spinning={loading} >



                <div className="logo d-flex w-100 justify-content-center">
                    <Image width="70%" preview={false} src={logo} alt="logo" />
                </div>
                <div className="header mb-4  ">
                    <h4 className="text-center" style = {{color:"grey"}} >Edit recording</h4>
                </div>

                <Form onFinish={onFinish} {...layout} form={form} >
                    <Form.Item
                        label="Title" >
                        <Input value={values.title || recording.title} name="title" onChange={onChange} placeholder="recording title" style={{ height: "50px", borderRadius: "10px" }} />
                    </Form.Item>
                    <Form.Item
                        label="Description" >
                        <Input.TextArea autoSize={{ minRows: "4" }} value={values.description || recording.description} name="description" onChange={onChange} placeholder="recording description" style={{ height: "50px", borderRadius: "10px" }} />
                    </Form.Item>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className="submit-button mt-4">
                        <Button htmlType="submit" id="submit-buton" shape="round"  >Edit recording</Button>
                    </div>

                </Form>
            </CustomSpinner>

        </Modal>
    )
}

const mapStateToProps = state => {

}
const mapDisPatchToProps = dispatch => {
    return {
    }

}

export default connect(mapStateToProps, mapDisPatchToProps)(EditMotivationModal)
