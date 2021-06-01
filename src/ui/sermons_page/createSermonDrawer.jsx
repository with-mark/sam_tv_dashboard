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
        <Drawer onClose = {onClose} visible = {visible} width = {450} >
            <Spin tip = {"Uploading video"} spinning = {state.uploading} >

            
            <div className="logo">
                <Image id = "logo" preview ={false} src = {logo} />
            </div>
            <div className="header-part text-center">
                <h5>Post a sermon</h5>
            </div>
            <div className="forms">
                
               
                <Form  {...formLayout} className = "mt-4 form " >
                    <Form.Item name = "title" rules = {[{required:true,message:"Title of live stream is required"}]} label = "Title" >
                            <Input placeholder = "Ener title of live stream" />
                    </Form.Item>
                   
                    <Form.Item  rules = {[{required:true,message:"Sermon's video is required"}]} label = "Video" name = "start_time" >
                    <Input.TextArea placeholder = "Enter video link" />
                    </Form.Item>
                    <Form.Item 
                    rules = {[{required:true}]}
                    name= "message"
                    label = "Message" >

                   
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
