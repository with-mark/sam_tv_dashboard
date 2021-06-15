import { Button, Drawer, Form, Image, Input, message, notification, Spin } from 'antd'
import React, { useState } from 'react'
import "./styles/createEventsDrawer.scss"
import logo from  "../../assets/images/logo.png"
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { db, storage } from '../../utils/networks/firebaseConfig'
import { pushNotificationCustomImage } from '../../utils/pushNotification';
import firebase from "../../utils/networks/firebaseConfig"


const formLayout =  {
    labelCol: { span: 6 },
    wrapperCol: { span:16 },
  };

  


const CreateEventsDrawer = ({visible,closeModal}) => {

    const [state,setState] = useState({
        loading:false,
        imageFile:null
    })
    const [form] = Form.useForm()

    const setLoading = status=>{
        setState({
            ...state,
            loading:status
        })
    }
    const onSubmit = (value)=>{
        setLoading(true)
        const file = state.imageFile
         storage.ref(`images/events/${file.name}`).put(file)
            .then(res=>{
                storage.ref('images/events')
                .child(file.name)
                .getDownloadURL()
                .then(cover_image=>{
                    db.collection("events").add({
                        ...value,
                        cover_image,
                        imgRef: `images/events/${file.name}`,
                        timestamp: new Date()
                    }).then(async()=>{
                        form.resetFields()
                        setLoading(false)
                        closeModal()
                        pushNotificationCustomImage("New event posted", value.title, "sam_tv_event", cover_image)
                        message.success("You have succesfully add an event")
                    }).catch(err=>{
                        setLoading(false)
                        notification.error({
                            message:"Error occured",
                            description:String(err)
                        })
                    })
                })
                .catch(err=>{
                    setLoading(false)
                    notification.error({
                        message:"Error occured",
                        description:String(err)
                    })
                })
            })
            .catch(err=>{
                notification.error({
                    message:"Error occured",
                    description:String(err)
                })
            })
    }
    return (
        <Drawer onClose = {closeModal} visible = {visible} width = {450} >
            <Spin tip = {state.imageUploading?"Uploading image":"Posting event"} spinning = {state.loading} >            
            <div className="logo">
                <Image id = "logo" preview ={false} src = {logo} />
            </div>
            <div className="header-part text-center">
                <h5>Post Event</h5>
            </div>
            <div className="forms">
                
              
                <Form  
                form = {form}
                onFinish = {onSubmit}
                {...formLayout} className = "mt-4 form " >
                    <Form.Item name = "title" rules = {[{required:true,message:"Title of live stream is required"}]} label = "Title" >
                            <Input 
                            
                            placeholder = "Ener title of event" />
                    </Form.Item>
                   
                    <Form.Item  rules = {[{required:true,message:"Sermon's video is required"}]} label = "Reg. Link" name = "registration_link" >
                    <Input.TextArea placeholder = "Enter registration link" />
                    </Form.Item>
                    <Form.Item 
                    // rules = {[{required:true}]}
                    name= "caption"
                    label = "Caption" >

                    <Input.TextArea placeholder = "Enter brief description or caption" />
                    </Form.Item>
                    <Form.Item rules = {[{required:true,message:"Cover image is required"}]} name = "cover_image" label = "Cover image">
                        <Input 
                        accept = "image/*"
                        onChange = {(e)=>{
                            if(e.target.files.length>0){
                                const file = e.target.files[0]
                                // console.log(file);
                                setState({
                                    ...state,
                                    imageFile:file
                                })
                         
                            }
                        }}
                        type = "file"/>
                    </Form.Item>
                    <div className="submit">
                    <Button disabled = {state.loading} htmlType = "submit" shape = "round" id = "submit-btn"> Post event</Button>

                    </div>

                </Form>
            </div>
            </Spin>
        </Drawer>
    )
}

function mapStateToProps(state) {
    return{
        events: state.events
    } ;
}
function mapDispatchToProps(dispatch) {
    return {
        // creatEvent : (event)=>dispatch(addEvents(event))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(CreateEventsDrawer)
