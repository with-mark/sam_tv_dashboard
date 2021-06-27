import { Modal, Image, Form, Input, Select, Button, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import logo from "../../assets/images/logo.png"
import { db, storage } from '../../utils/networks/firebaseConfig';
import { readWriteOnly } from '../../utils/permissions';
import CustomSpinner from '../../utils/ui/customSpinner/CustomSpinner';

const collectionName = "testimonies"


const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 24 },
};

const EditTestmonyDrawer = ({ visible, onClose, testimony }) => {
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(testimony.type)
    const [imagefile, setImage] = useState(null)
    const [values, setValues] = useState({
        title: testimony.title,
        caption: testimony.caption
    })


    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const [form] = useForm()
    const onFinish = () => {

        setLoading(true)
        if (testimony.type === "picture" && type === "text") {
            storage.ref().child(`${testimony.imgRef}`).delete()
                .then(() => {
                    db.collection(collectionName).doc(testimony.id).set({
                        ...values,
                        title: values.title || testimony.title,
                        description: values.description || testimony.description,
                        timestamp: new Date(),
                        type: type
                    }).then(() => {
                        setLoading(false)
                        form.resetFields()
                        onClose()
                        message.success("Testimony updated successfully")
                    })

                }).catch(err => {
                    message.error(`Updating Testimony failed, reason: ${String(err)}`)
                    setLoading(false)
                })

        }
        else if (testimony.type === "text" && type === "picture" && imagefile) {
            const basePath = "images/testimonies"
            storage.ref(`${basePath}/${imagefile.name}`).put(imagefile)
                .then(() => {
                    storage.ref(basePath)
                        .child(imagefile.name)
                        .getDownloadURL()
                        .then(image => {
                            console.log(image);
                            db.collection(collectionName).doc(testimony.id).set({
                                title: values.title || testimony.title,
                                image,
                                imgRef: `${basePath}/${imagefile.name}`,
                                timestamp: new Date(),
                                type
                            }).then(() => {
                                setLoading(false)
                                form.resetFields()
                                onClose()
                                message.success("Testimony updated successfully")
                            })

                        })

                }).catch(err => {
                    message.error(`Updating Testimony failed, reason: ${String(err)}`)
                    setLoading(false)
                })


        }
        else if ((type === "picture" || testimony.type === "picture") && imagefile) {
            const basePath = "images/testimonies"
            storage.ref().child(`${testimony.imgRef}`).delete()
                .then(() => {
                    storage.ref(`${basePath}/${imagefile.name}`).put(imagefile)
                        .then(() => {
                            storage.ref(basePath)
                                .child(imagefile.name)
                                .getDownloadURL()
                                .then(image => {
                                    console.log(image);
                                    db.collection(collectionName).doc(testimony.id).update({
                                        title: values.title || testimony.title,
                                        image,
                                        imgRef: `${basePath}/${imagefile.name}`,
                                        timestamp: new Date()
                                    }).then(() => {
                                        setLoading(false)
                                        form.resetFields()
                                        onClose()
                                        message.success("Testimony updated successfully")
                                    })

                                }).catch(err => {
                                    message.error(`Updating Testimony failed, reason: ${String(err)}`)
                                    setLoading(false)
                                })

                        })

                }).catch(err => {
                    message.error(`Updating Testimony failed, reason: ${String(err)}`)
                    setLoading(false)

                })


        } else {
            db.collection(collectionName).doc(testimony.id).set({
                ...values,
                title: values.title || testimony.title,
                description: values.description || testimony.description,
                timestamp: new Date(),
                type: type || testimony.type
            }).then(() => {
                setLoading(false)
                form.resetFields()
                onClose()
                message.success("Testimony updated successfully")
            }).catch(err => {
                message.error(`Updating Testimony failed, reason: ${String(err)}`)
                setLoading(false)
            })

        }




    }

    console.log(testimony);

    return (
        <Modal visible={visible} onCancel={onClose} footer={null} >
            <CustomSpinner spinning={loading} >



                <div className="logo d-flex w-100 justify-content-center">
                    <Image width="70%" preview={false} src={logo} alt="logo" />
                </div>
                <div className="header mb-4  ">
                    <h4 className="text-center" >Edit Testimony</h4>
                </div>

                <Form onFinish={values => {
                    readWriteOnly()
                        .then(() => {
                            onFinish(values)
                        }).catch(() => {
                            message.error("Sorry you do not have read write permissions")
                        })
                }} {...layout} form={form} >
                    <Form.Item
                        label="Title" >
                        <Input name="title" value={values.title || testimony.title} onChange={handleChange} placeholder="Testimony title" style={{ height: "50px", borderRadius: "10px" }} />
                    </Form.Item>
                    <Form.Item label="Type" >
                        <Select value={type || testimony.type} onChange={setType} >
                            <Select.Option value="picture" >
                                Picture
                            </Select.Option>
                            <Select.Option value="text" >
                                Text
                            </Select.Option>
                        </Select>

                    </Form.Item>



                    <Form.Item
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: "Testimony image is required"
                            }
                        ]}
                        label="Image" >
                        <input
                            onChange={(e) => {
                                setImage(e.target.files[0])
                            }}
                            accept="image/*" type="file" />
                    </Form.Item>


                    <Form.Item label="Caption" >
                        <Input.TextArea
                            name="caption"
                            onChange={handleChange}
                            value={values.description || testimony.description}
                            placeholder="Testimony caption"
                            rows="4"
                            style={{ borderRadius: "10px" }}
                        />
                    </Form.Item>




                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className="submit-button mt-4">
                        <Button htmlType="submit" id="submit-buton" shape="round"  >Post Testimony</Button>
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

export default connect(mapStateToProps, mapDisPatchToProps)(EditTestmonyDrawer)
