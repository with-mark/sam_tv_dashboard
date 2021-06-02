import { Button, Drawer, Form, Image, Input, Spin } from 'antd'
import React, { useState } from 'react'
import "./styles/createSermonDrawer.scss"
import logo from  "../../assets/images/logo.png"
import ReactQuill   from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { addSermon } from '../../state_mamger/functions/sermons';


const formLayout =  {
   messageString:""
  };


  


const CreateSermonDrawer = ({visible,onClose,sermon,createSermon}) => {

    const [state,setState] = useState({
        editorState:""
    })
    const setEditorState= (state)=>{
        setState({
            ...state,
            editorState:state
        })
    }
    const onSubmit = (value)=>{
      createSermon(
          {
              ...value,
              message:state.editorState
          }
      );
    }
    return (
        <Drawer onClose = {onClose} visible = {visible} width = {450} >
            <Spin tip = {"Uploading video"} spinning = {sermon.postLoading} >

            
            <div className="logo">
                <Image id = "logo" preview ={false} src = {logo} />
            </div>
            <div className="header-part text-center">
                <h5>Post a sermon</h5>
            </div>
            <div className="forms">
                
               {state.editorState}
                <Form  
                onFinish = {onSubmit}
                {...formLayout} className = "mt-4 form " >
                    <Form.Item name = "title" rules = {[{required:true,message:"Title of live stream is required"}]} label = "Title" >
                            <Input placeholder = "Ener title of live stream" />
                    </Form.Item>
                   
                    <Form.Item  rules = {[{required:true,message:"Sermon's video is required"}]} label = "Video" name = "videoLink" >
                    <Input.TextArea placeholder = "Enter video link" />
                    </Form.Item>
                    <Form.Item 
                    rules = {[{validator:(rule,value,callback)=>{
                        if( state.editorState === ""){
                            return callback("Message field cannot be empty")
                        }else{
                            return callback()
                        }
                    }}]}
                    name= "message"
                    label = "Message" >

                   
                    <div className="editor">
                        <ReactQuill
                        
                        onChange = {e=>{
                            setEditorState(e)
                        }}
                        />
                    </div>

                    </Form.Item>
                    <div className="submit">
                    <Button  htmlType = "submit" shape = "round" id = "submit-btn"> Create stream</Button>

                    </div>

                </Form>
            </div>
            </Spin>
        </Drawer>
    )
}

function mapStateToProps(state) {
    return{
        sermon: state.sermons
    } ;
}
function mapDispatchToProps(dispatch) {
    return {
        createSermon : (sermon)=>dispatch(addSermon(sermon))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(CreateSermonDrawer)
