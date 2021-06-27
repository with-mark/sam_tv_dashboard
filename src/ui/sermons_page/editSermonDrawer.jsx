import { Button, Modal, Form, Image, Input, message } from 'antd'
import React, { useState } from 'react'
import "./styles/createSermonDrawer.scss"
import logo from "../../assets/images/logo.png"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { addSermon } from '../../state_mamger/functions/sermons';
import { readWriteOnly } from '../../utils/permissions'
import CustomSpinner from '../../utils/ui/customSpinner/CustomSpinner'


const formLayout = {
    messageString: ""
};





const EditSermonDrawer = ({ visible, onClose, sermon, createSermon, item }) => {
    console.log(item.message);
    const [state, setState] = useState({
        editorState: item.message
    })
    const setEditorState = (editstate) => {
        setState({
            ...state,
            editorState: editstate
        })
    }

    const onSubmit = (value) => {
        createSermon(
            {
                ...value,
                message: state.editorState
            }
        );
    }

    return (

        <Modal onCancel={onClose} visible={visible} footer={null} >
            {console.log(state)}
            <CustomSpinner tip={"Uploading video"} spinning={sermon.postLoading} >


                <div className="logo d-flex w-100 justify-content-center">
                    <Image width="70%" id="logo" preview={false} src={logo} />
                </div>
                <div className="header-part text-center">
                    <h5>Edit sermon</h5>
                </div>
                <div className="forms">

                    <Form
                        onFinish={values => {
                            readWriteOnly()
                                .then(() => {
                                    onSubmit(values)
                                }).catch(() => {
                                    message.error("Sorry you do not have read/write permssions")
                                })
                        }}
                        {...formLayout} className="mt-4 form " >
                        <Form.Item initialValue={item.title} name="title" rules={[{ required: true, message: "Title of live stream is required" }]} label="Title" >
                            <Input placeholder="Ener title of live stream" />
                        </Form.Item>

                        <Form.Item initialValue={item.videoLink} rules={[{ required: true, message: "Sermon's video is required" }]} label="Video" name="videoLink" >
                            <Input placeholder="Enter video link" />
                        </Form.Item>
                        <Form.Item
                            initialValue={item.message}
                            rules={[{
                                validator: (_, value, callback) => {
                                    if (state.editorState === "") {
                                        return callback("Message field cannot be empty")
                                    } else {
                                        return callback()
                                    }
                                }
                            }]}
                            name="message"
                            label="Message" >

                            {console.log(state.editorState)}
                            <div className="editor">
                                <ReactQuill
                                    value={state.editorState || item.message}
                                    onChange={e => {
                                        setEditorState(e)
                                    }}
                                />
                            </div>

                        </Form.Item>
                        <div className="submit">
                            <Button htmlType="submit" shape="round" id="submit-btn"> Create stream</Button>

                        </div>

                    </Form>
                </div>
            </CustomSpinner>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditSermonDrawer)
