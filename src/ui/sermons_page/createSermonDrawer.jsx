import { Button, Drawer, Form, Image, Input, message, Spin, TimePicker } from 'antd'
import React, { useState } from 'react'
import "./styles/createSermonDrawer.scss"
import logo from  "../../assets/images/logo.png"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { storage } from '../../utils/networks/firebaseConfig';


const formLayout =  {
    labelCol: { span: 4 },
    wrapperCol: { span:24 },
  };



const CreateSermonDrawer = ({visible,onClose}) => {
    const [state,setState] = useState({
        imageUrl:null,
        uploading:false,

    })

    const setUploading =status=>{
        setState({
            ...state,
            uploading:status
        })
    }

    const setImageUrl = url=>{
        setState({
            ...state,
            imageUrl:url
        })

    }
    return (
        <Drawer onClose = {onClose} visible = {visible} width = {400} >
            <Spin tip = {"Uploading video"} spinning = {state.uploading} >

            
            <div className="logo">
                <Image id = "logo" preview ={false} src = {logo} />
            </div>
            <div className="header-part text-center">
                <h5>Create Live stream</h5>
            </div>
            <div className="forms">
                
               
                <Form  {...formLayout} className = "mt-4 form " >
                    <Form.Item name = "title" rules = {[{required:true,message:"Title of live stream is required"}]} label = "Title" >
                            <Input placeholder = "Ener title of live stream" />
                    </Form.Item>
                   
                    <Form.Item  rules = {[{required:true,message:"Sermon's video is required"}]} label = "Video" name = "start_time" >
                    <Dragger
                    
                    multiple = {false}
                    customRequest = {({file,onSuccess})=>{
                        setTimeout(() => {
                            // onSuccess("ok");
                            onSuccess("uploading")
                          }, 2000);
                    }}
                    onChange = {(up)=>{
                        const file = up.file
                        setUploading(true)
                        storage.ref(`videos/sermons/${file.name}`).put(file)
                        
                        .then(snapshot=>{
                            message.success("Video uploaded successfully")
                            // console.log(snapshot);
                            storage.ref('videos/sermons/')
                            .child(file.name)
                            .getDownloadURL()
                            .then(value=>{
                                setUploading(false)
                                setImageUrl(value)
                            }).catch(err=>{
                                message.error("Video upload failed")
                                console.log(err);
                            })
                        })
                        .catch(err=>{
                            setUploading(false)
                            message.error("Video upload failed")
                            console.log(err);
                        })
                        

                        
                    }}

                    >
                        <p className="ant-upload-drag-icon">
                        <VideoCameraOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag sermon video into this field</p>
                       
                    </Dragger>
                    </Form.Item>
                    <Form.Item label = "Message" >

                   
                    <div className="editor">
                        <Editor
                        spellCheck
                        
                            // editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            // onEditorStateChange={this.onEditorStateChange}
                            />;
                    </div>
                    </Form.Item>
                    <div className="submit">
                    <Button disabled = {!state.imageUrl} htmlType = "submit" shape = "round" id = "submit-btn"> Create stream</Button>

                    </div>

                </Form>
            </div>
            </Spin>
        </Drawer>
    )
}

export default CreateSermonDrawer
