import { Button, Modal, Form, Image, Input, message, Select, Spin } from 'antd'
import React, { useState } from 'react'
import "./styles/createSermonDrawer.scss"
import logo from "../../assets/images/logo.png"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { addSermon } from '../../state_mamger/functions/sermons';
import { db, storage } from '../../utils/networks/firebaseConfig'
import { v4 } from 'uuid'
import { readWriteOnly } from '../../utils/permissions'
const collectionName = "sermons"

const formLayout = {
    messageString: ""
};


const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 24 },
};



const CreateSermonDrawer = ({ visible, onClose, sermon, createSermon }) => {

    const [state, setState] = useState({
        editorState: "",
    })
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("file")
    const [form] = Form.useForm()

    const [videoFile, setVideoFile] = useState(null)

    const changeVideoFile = e => {
        console.log(e.target.files[0]);
        setVideoFile(e.target.files[0])
    }

    const setEditorState = (state) => {
        setState({
            ...state,
            editorState: state
        })
    }
    const onSubmit = (value) => {
        // console.log(videoFile);
        setLoading(true)
        if (type === "file" && videoFile !== null) {
            console.log("Hello");
            const basePath = "videos/sermons"
            const fileName = `${v4()}-${videoFile.name}}`
            storage.ref(`${basePath}/${fileName}`).put(videoFile)
                .then(() => {
                    storage.ref(basePath)
                        .child(fileName)
                        .getDownloadURL()
                        .then(videoLink => {
                            console.log(videoLink);
                            db.collection(collectionName)
                                .add({
                                    title: value.title,
                                    videoLink,
                                    message: state.editorState,
                                    type,
                                    fileRef: `${basePath}/${fileName}`,
                                    timestamp: new Date()

                                }).then(() => {
                                    form.resetFields()
                                    setLoading(false)
                                    // changeVideoFile(null)
                                    onClose()
                                    message.success("You have successfully posted a sermon")

                                }).catch(err => {
                                    message.error("Posting sermon failed, Reason " + String(err))
                                })
                        }).catch(err => {
                            message.error("Posting sermon failed, Reason " + String(err))
                        })
                }).catch(err => {
                    message.error("Posting sermon failed, Reason " + String(err))
                })
        } else {
            db.collection(collectionName)
                .add({
                    title: value.title,
                    videoLink: value.videoUrl,
                    type,
                    message: state.editorState,
                    timestamp: new Date()

                }).then(() => {
                    form.resetFields()
                    setLoading(false)
                    // changeVideoFile(null)
                    onClose()
                    message.success("You have successfully posted a sermon")
                }).catch(err => {
                    message.error("Posting sermon failed, Reason " + String(err))
                })

        }

    }
    return (
        <Modal onCancel={onClose} visible={visible} footer={null} >
            <Spin tip={"Uploading video"} spinning={loading} >

                <div className="logo width-100 d-flex justify-content-center ">
                    <Image width="70%" id="logo" preview={false} src={logo} />
                </div>
                <div className="header-part text-center">
                    <h5>Post a sermon</h5>
                </div>
                <div className="forms">

                    <Form
                        form={form}
                        {...layout}
                        onFinish={values => {
                            readWriteOnly()
                                .then(() => {
                                    onSubmit(values)
                                }).catch(() => {
                                    message.error("Sorry! You do not have read write permission")
                                })
                        }}
                        {...formLayout} className="mt-4 form " >
                        <Form.Item name="title" rules={[{ required: true, message: "Title of live stream is required" }]} label="Title" >
                            <Input placeholder="Ener title of live stream" />
                        </Form.Item>

                        <Form.Item name="type" initialValue={type} label="Title" >
                            <Select onChange={setType} >
                                <Select.Option value="file" > Upload video </Select.Option>
                                <Select.Option value="external" > External Url</Select.Option>
                            </Select>
                        </Form.Item>

                        {type === "file" ? (
                            <Form.Item name="videoLink" rules={[{ required: true }]} label="Video" >
                                <input onChange={changeVideoFile} type="file" accept="video/*" />
                            </Form.Item>
                        ) : (
                            <Form.Item rules={[{ required: true, message: "Sermon's video is required" }]} label="Video" name="videoUrl" >
                                <Input.TextArea placeholder="Enter video link" />
                            </Form.Item>
                        )}

                        <Form.Item
                            rules={[{
                                validator: (rule, value, callback) => {
                                    if (state.editorState === "") {
                                        return callback("Message field cannot be empty")
                                    } else {
                                        return callback()
                                    }
                                }
                            }]}
                            name="message"
                            label="Message" >


                            <div className="editor">
                                <ReactQuill

                                    onChange={e => {
                                        setEditorState(e)
                                    }}
                                />
                            </div>

                        </Form.Item>
                        <div className="submit">
                            <Button style={{ height: "45px" }} htmlType="submit" shape="round" id="submit-btn"> Create stream</Button>

                        </div>

                    </Form>
                </div>
            </Spin>
        </Modal>
    )
}


function mapStateToProps(state) {
    return {
        sermon: state.sermons
    };
}
function mapDispatchToProps(dispatch) {
    return {
        createSermon: (sermon) => dispatch(addSermon(sermon))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateSermonDrawer)
