import { Modal, Image, Form, Input, Select, Button,  message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import logo from "../../assets/images/logo.png"
import { db, storage } from '../../utils/networks/firebaseConfig';
import { readWriteOnly } from '../../utils/permissions';
import CustomSpinner from '../../utils/ui/customSpinner/CustomSpinner';

const collectionName = "motivations"


const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 24 },
};

const EditMotivationDrawer = ({ visible, onClose, motivation }) => {
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(motivation.type)
    const [imagefile, setImage] = useState(null)
    const [values, setValues] = useState({
        title: motivation.title,
        type: motivation.type,
        description: motivation.description
    })



    const [form] = useForm()
    const onFinish = () => {


        readWriteOnly()
            .then(() => {
                setLoading(true)
                if (motivation.type === "picture" && type === "text") {
                    storage.ref().child(`${motivation.imgRef}`).delete()
                        .then(() => {
                            db.collection(collectionName).doc(motivation.id).set({
                                ...values,
                                title: values.title || motivation.title,
                                description: values.description || motivation.description,
                                timestamp: new Date(),
                                type: type
                            }).then(() => {
                                setLoading(false)
                                form.resetFields()
                                onClose()
                                message.success("Motivation updated successfully")
                            })

                        }).catch(err => {
                            message.error(`Updating motivation failed, reason: ${String(err)}`)
                            setLoading(false)
                        })

                }
                else if (motivation.type === "text" && type === "picture" && imagefile) {
                    const basePath = "images/motivations"
                    storage.ref(`${basePath}/${imagefile.name}`).put(imagefile)
                        .then(() => {
                            storage.ref(basePath)
                                .child(imagefile.name)
                                .getDownloadURL()
                                .then(image => {
                                    console.log(image);
                                    db.collection(collectionName).doc(motivation.id).set({
                                        title: values.title || motivation.title,
                                        image,
                                        imgRef: `${basePath}/${imagefile.name}`,
                                        timestamp: new Date(),
                                        type
                                    }).then(() => {
                                        setLoading(false)
                                        form.resetFields()
                                        onClose()
                                        message.success("Motivation updated successfully")
                                    })

                                })

                        }).catch(err => {
                            message.error(`Updating motivation failed, reason: ${String(err)}`)
                            setLoading(false)
                        })


                }
                else if ((type === "picture" || motivation.type === "picture") && imagefile) {
                    const basePath = "images/motivations"
                    storage.ref().child(`${motivation.imgRef}`).delete()
                        .then(() => {
                            storage.ref(`${basePath}/${imagefile.name}`).put(imagefile)
                                .then(() => {
                                    storage.ref(basePath)
                                        .child(imagefile.name)
                                        .getDownloadURL()
                                        .then(image => {
                                            console.log(image);
                                            db.collection(collectionName).doc(motivation.id).update({
                                                title: values.title || motivation.title,
                                                image,
                                                imgRef: `${basePath}/${imagefile.name}`,
                                                timestamp: new Date()
                                            }).then(() => {
                                                setLoading(false)
                                                form.resetFields()
                                                onClose()
                                                message.success("Motivation updated successfully")
                                            })

                                        }).catch(err => {
                                            message.error(`Updating motivation failed, reason: ${String(err)}`)
                                            setLoading(false)
                                        })

                                })

                        }).catch(err => {
                            message.error(`Updating motivation failed, reason: ${String(err)}`)
                            setLoading(false)

                        })


                } else {
                    db.collection(collectionName).doc(motivation.id).set({
                        ...values,
                        title: values.title || motivation.title,
                        description: values.description || motivation.description,
                        timestamp: new Date(),
                        type: type || motivation.type
                    }).then(() => {
                        setLoading(false)
                        form.resetFields()
                        onClose()
                        message.success("Motivation updated successfully")
                    }).catch(err => {
                        message.error(`Updating motivation failed, reason: ${String(err)}`)
                        setLoading(false)
                    })

                }
            })
            .catch(() => {
                message.error("Sorry you do not have write permissions")

            })





    }
    console.log(motivation);

    return (
        <Modal visible={visible} onCancel={onClose} footer={null}>
            <CustomSpinner spinning={loading} >



                <div className="logo d-flex w-100 justify-content-center">
                    <Image width="70%" preview={false} src={logo} alt="logo" />
                </div>
                <div className="header mb-4  ">
                    <h4 className="text-center" >Edit Motivation</h4>
                </div>

                <Form onFinish={onFinish} {...layout} form={form} >
                    <Form.Item
                        label="Title" >
                        <Input value={values.title || motivation.title} onChange={(e) => { setValues({ ...values, title: e.target.value }) }} placeholder="Motivation title" style={{ height: "50px", borderRadius: "10px" }} />
                    </Form.Item>
                    <Form.Item label="Type" >
                        <Select value={type || motivation.type} onChange={setType} >
                            <Select.Option value="picture" >
                                Picture
                            </Select.Option>
                            <Select.Option value="text" >
                                Text
                            </Select.Option>
                        </Select>

                    </Form.Item>


                    {type === "picture" && motivation.type === "picture" ? (

                        <Form.Item
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: "Motivation image is required"
                                }
                            ]}
                            label="Image" >
                            <input
                                onChange={(e) => {
                                    setImage(e.target.files[0])
                                }}
                                accept="image/*" type="file" />
                        </Form.Item>

                    ) : (

                        <Form.Item label="Description" >
                            <Input.TextArea
                                onChange={(e) => { setValues({ ...values, description: e.target.value }) }}
                                value={values.description || motivation.description}
                                placeholder="Motivation description"
                                rows="4"
                                style={{ borderRadius: "10px" }}
                            />
                        </Form.Item>
                    )}




                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className="submit-button mt-4">
                        <Button htmlType="submit" id="submit-buton" shape="round"  >Post Motivation</Button>
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

export default connect(mapStateToProps, mapDisPatchToProps)(EditMotivationDrawer)
