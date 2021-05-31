import { Button, Drawer, Form, Image, Input, TimePicker } from 'antd'
import React from 'react'
import "./styles/createStreamDrawer.scss"
import logo from  "../../assets/images/logo.png"



const formLayout =  {
    labelCol: { span: 6 },
    wrapperCol: { span:16 },
  };


  
const CreateStreamDrawer = ({visible,onClose}) => {
    return (
        <Drawer onClose = {onClose} visible = {visible} width = {400} >
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
                    <Form.Item rules = {[{required:true}]} name = "description" label = "Description" >
                        <Input.TextArea placeholder= "Enter brief description of the livestream" />
                    </Form.Item>
                    <Form.Item name = "start_time" label = "Start time">
                        <TimePicker  />
                    </Form.Item>
                    <div className="submit">
                    <Button htmlType = "submit" shape = "round" id = "submit-btn"> Create stream</Button>

                    </div>

                </Form>
            </div>
            
        </Drawer>
    )
}

export default CreateStreamDrawer
