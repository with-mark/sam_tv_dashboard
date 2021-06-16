import { Button, Drawer, Form, Image, Input, message, notification, Spin } from 'antd'
import React, { useState } from 'react'
import "./styles/createEventsDrawer.scss"
import logo from "../../assets/images/logo.png"
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { db, storage } from '../../utils/networks/firebaseConfig'


const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};




const EditEventsDrawer = ({ visible, closeModal, event }) => {

    const [state, setState] = useState({
        loading: false,
        imageFile: null
    })
    const [values, setValues] = useState({
        title: event.title,
        registration_link: event.registration_link,
        caption: event.caption
    })
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const [form] = Form.useForm()


    const setLoading = status => {
        setState({
            ...state,
            loading: status
        })
    }
    const onSubmit = () => {
        setLoading(true)
        if (state.imageFile) {
            storage.ref()
                .child(event.imgRef)
                .delete()
                .then(() => {
                    const file = state.imageFile
                    storage.ref(`images/events/${file.name}`).put(file)
                        .then(() => {
                            storage.ref('images/events')
                                .child(file.name)
                                .getDownloadURL()
                                .then((cover_image) => {
                                    db.collection("events")
                                        .doc(event.id).set({
                                            caption: values.caption || event.caption,
                                            registration_link: values.registration_link || event.registration_link,
                                            title: values.title || event.title,
                                            cover_image
                                        }).then(() => {
                                            setLoading(false)
                                            form.resetFields()
                                            closeModal()
                                            message.success("You have successfully updated")

                                        })

                                })

                        })


                }).catch(err => {
                    setLoading(false)
                    notification.error({
                        message: "Updating event failed",
                        description: String(err)
                    })

                })
        } else {
            db.collection("events")
                .doc(event.id).update({
                    caption: values.caption || event.caption,
                    registration_link: values.registration_link || event.registration_link,
                    title: values.title || event.title,
                }).then(() => {
                    setLoading(false)
                    form.resetFields()
                    closeModal()
                    message.success("You have successfully updated")

                }).catch(err => {
                    setLoading(false)
                    notification.error({
                        message: "Updating event failed",
                        description: String(err)
                    })

                })
        }

    }

    // console.log(event);
    return (
        <Drawer onClose={() => {
            closeModal()

        }} visible={visible} width={450} >
            <Spin tip={state.imageUploading ? "Uploading image" : "Posting event"} spinning={state.loading} >
                <div className="logo">
                    <Image id="logo" preview={false} src={logo} />
                </div>
                <div className="header-part text-center">
                    <h5>Edit Event</h5>
                </div>
                <div className="forms">


                    <Form
                        form={form}
                        onFinish={onSubmit}
                        {...formLayout} className="mt-4 form " >
                        <Form.Item label="Title" >
                            <Input
                                onChange={handleChange}
                                value={values.title || event.title}
                                name="title"
                                placeholder="Ener title of event" />
                        </Form.Item>

                        <Form.Item label="Reg. Link"  >
                            <Input.TextArea
                                onChange={handleChange}
                                value={values.registration_link || event.registration_link}
                                name="registration_link" placeholder="Enter registration link" />
                        </Form.Item>
                        <Form.Item
                            label="Caption" >

                            <Input.TextArea name="caption" onChange={handleChange} rows="8" value={values.caption || event.caption} placeholder="Enter brief description or caption" />
                        </Form.Item>
                        <Form.Item name="cover_image" label="Cover image">
                            <Input
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        const file = e.target.files[0]
                                        // console.log(file);
                                        setState({
                                            ...state,
                                            imageFile: file
                                        })

                                    }
                                }}
                                type="file" />
                        </Form.Item>
                        <div className="submit">
                            <Button disabled={state.loading} htmlType="submit" shape="round" id="submit-btn"> Post event</Button>

                        </div>

                    </Form>
                </div>
            </Spin>
        </Drawer>
    )
}

function mapStateToProps(state) {
    return {
        events: state.events
    };
}
function mapDispatchToProps(dispatch) {
    return {
        // creatEvent : (event)=>dispatch(addEvents(event))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditEventsDrawer)
