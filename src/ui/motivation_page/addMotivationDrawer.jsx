import { Modal, Image, Form, Input, Select, Button, Spin, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import logo from "../../assets/images/logo.png"
import { db, storage } from '../../utils/networks/firebaseConfig';
import { pushNotificationCustomImage, pushNotificationNoImage } from '../../utils/pushNotification';

const collectionName = "motivations"


const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 24 },
};

const AddMotivationDrawer = ({ visible, onClose }) => {
    const [loading, setLoading] = useState(false)
    const [type,setType] = useState("picture")
    const [imagefile,setImage] = useState(null)



    const [form] = useForm()
    const onFinish = values => {
        
        setLoading(true)
        if (type === "picture"){
            const basePath = "images/motivations"
            storage.ref(`${basePath}/${imagefile.name}`).put(imagefile)
                .then(() => {
                    storage.ref(basePath)
                        .child(imagefile.name)
                        .getDownloadURL()
                        .then(image => {
                            console.log(image);
                            db.collection(collectionName).add({
                                ...values,
                                image,
                                imgRef: `${basePath}/${imagefile.name}`,
                                timestamp: new Date()
                            }).then(() => {
                                setLoading(false)
                                pushNotificationCustomImage("Motivation!", values.title, "sam_tv_motivation", image)
                                form.resetFields()
                                onClose()
                                message.success("Motivation posted successfully")
                            })

                        }).catch(err => {
                            message.error(`Posting motivation failed, reason: ${String(err)}`)
                            setLoading(false)
                        })

                })

        }else{
            db.collection(collectionName).add({
                ...values,
                timestamp: new Date()
            }).then(() => {
                setLoading(false)
                pushNotificationNoImage("Motivstion!", values.title, "sam_tv_motivation")
                form.resetFields()
                onClose()
                message.success("Motivation posted successfully")
            }).catch(err => {
                message.error(`Posting motivation failed, reason: ${String(err)}`)
                setLoading(false)
            })
            
        }

        


    }


    return (
        <Modal visible={visible} onCancel={onClose}  footer = {null} >
            <Spin spinning={loading} >



                <div className="logo">
                    <Image preview={false} src={logo} alt="logo" />
                </div>
                <div className="header mb-4  ">
                    <h4 className="text-center" >Post Motivation</h4>
                </div>

                <Form onFinish={onFinish} {...layout} form={form} >
                    <Form.Item
                        name="title"
                        rules={[{
                            required: true,
                            message: "Motivation title is required"
                        }]}
                        label="Title" >
                        <Input placeholder="Motivation title" style={{ height: "50px", borderRadius: "10px" }} />
                    </Form.Item>
                    <Form.Item initialValue = {type} name="type" label="Type" >
                        <Select onChange={setType} >
                            <Select.Option value = "picture" >
                                Picture
                            </Select.Option>
                            <Select.Option value = "text" >
                                Text
                            </Select.Option>
                        </Select>

                    </Form.Item>
        

                        {type === "picture"?(

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
                            onChange = {(e)=>{
                                setImage(e.target.files[0])
                            }}
                            accept = "image/*" type="file" />
                        </Form.Item>

                        ):(

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
                        )}


                    

                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className="submit-button mt-4">
                        <Button htmlType="submit" id="submit-buton" shape="round"  >Post Motivation</Button>
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

export default connect(mapStateToProps, mapDisPatchToProps)(AddMotivationDrawer)
