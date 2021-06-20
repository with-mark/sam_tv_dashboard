import { Modal, Image, Form, Input, Select, Button, Spin, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import logo from "../../assets/images/logo.png"
import { db, storage } from '../../utils/networks/firebaseConfig';
import { pushNotificationCustomImage, pushNotificationNoImage } from '../../utils/pushNotification';

const collectionName = "testimonies"


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 },
};

const AddTestimonyDrawer = ({ visible, onClose }) => {
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("picture")
    const [testimonyFile, setImage] = useState(null)



    const [form] = useForm()
    const onFinish = values => {

        setLoading(true)
        if (type === "picture") {
            const basePath = "images/testimonies"
            storage.ref(`${basePath}/${testimonyFile.name}`).put(testimonyFile)
                .then(() => {
                    storage.ref(basePath)
                        .child(testimonyFile.name)
                        .getDownloadURL()
                        .then(image => {
                            console.log(image);
                            db.collection(collectionName).add({
                                ...values,
                                image,
                                fileRef: `${basePath}/${testimonyFile.name}`,
                                timestamp: new Date(),
                                type
                            }).then(() => {
                                setLoading(false)
                                pushNotificationCustomImage("Testimony!", values.title, "sam_tv_testimony", image)
                                form.resetFields()
                                onClose()
                                message.success("Testimony posted successfully")
                            })

                        }).catch(err => {
                            message.error(`Posting testimony failed, reason: ${String(err)}`)
                            setLoading(false)
                        })

                })

        } else {

            const basePath = "videos/testimonies"
            storage.ref(`${basePath}/${testimonyFile.name}`).put(testimonyFile)
                .then(() => {
                    storage.ref(basePath)
                        .child(testimonyFile.name)
                        .getDownloadURL()
                        .then(video => {
                            db.collection(collectionName).add({
                                ...values,
                                fileRef: `${basePath}/${testimonyFile.name}`,
                                video,
                                timestamp: new Date()
                            }).then(() => {
                                setLoading(false)
                                pushNotificationNoImage("Motivstion!", values.title, "sam_tv_testimony")
                                form.resetFields()
                                onClose()
                                message.success("Testimony posted successfully")
                            }).catch(err => {
                                message.error(`Posting Testimony failed, reason: ${String(err)}`)
                                setLoading(false)
                            })
                        }).catch(err => {
                            message.error(`Posting Testimony failed, reason: ${String(err)}`)
                            setLoading(false)
                        })
                })
                .catch(err => {
                    message.error(`Posting Testimony failed, reason: ${String(err)}`)
                    setLoading(false)
                })

        }




    }
    return (
        <Modal visible={visible} onCancel={onClose} footer = {null} >
            <Spin spinning={loading} >



                <div className="logo d-flex w-100 justify-content-center">
                    <Image width = "70%" preview={false} src={logo} alt="logo" />
                </div>
                <div className="header mb-4  ">
                    <h4 className="text-center" >Post Testimony</h4>
                </div>

                <Form onFinish={onFinish} {...layout} form={form} >
                    <Form.Item
                        name="title"
                        rules={[{
                            required: true,
                            message: "Testimony title is required"
                        }]}
                        label="Title" >
                        <Input placeholder="Testimony title" style={{ height: "50px", borderRadius: "10px" }} />
                    </Form.Item>

                    <Form.Item
                        name="author"
                        rules={[{
                            required: true,
                            message: "Testimony title is required"
                        }]}
                        label="Name " >
                        <Input placeholder="Name of the person who testified" style={{ height: "50px", borderRadius: "10px" }} />
                    </Form.Item>

                    <Form.Item initialValue={type} name="type" label="Type" >
                        <Select onChange={setType} >
                            <Select.Option value="picture" >
                                Picture
                            </Select.Option>
                            <Select.Option value="video" >
                                Video
                            </Select.Option>
                        </Select>

                    </Form.Item>


                    <Form.Item
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Motivation description is required"
                            }
                        ]}
                        label="Description" >
                        <Input.TextArea placeholder="Motivation description" rows="4" style={{ borderRadius: "10px" }} />
                    </Form.Item>


                    <Form.Item
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: "Motivation image is required"
                            }
                        ]}
                        label={type === "picture" ? "Image" : "Video"} >
                        <input
                            style={{ height: "50px", borderRadius: "10px" }}
                            onChange={(e) => {
                                setImage(e.target.files[0])
                            }}
                            accept={type === "picture" ? "image/*" : "video/*"} type="file" />
                    </Form.Item>


                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className="submit-button mt-4">
                        <Button htmlType="submit" id="submit-buton" shape="round"  >Post Testimony</Button>
                    </div>

                </Form>
            </Spin>

        </Modal>
    )
}

const mapStateToProps = state => {

}
const mapDisPatchToProps = dispatch => {
    return {
        // addMotivation: (motivation) => dispatch(postMotivation(motivation))
    }

}

export default connect(mapStateToProps, mapDisPatchToProps)(AddTestimonyDrawer)
