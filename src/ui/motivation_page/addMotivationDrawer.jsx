import { Drawer, Image, Form, Input, Button} from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React from 'react'
import logo from "../../assets/images/logo.png"


const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 24 },
};

const AddMotivationDrawer = ({visible,onClose}) => {
    const [form] = useForm()
    return (
        <Drawer visible = {visible} onClose = {onClose} placement = "right"  width = "500px" >

            <div className="logo">
                <Image preview = {false} src = {logo} alt = "logo" />
            </div>
            <div className="header mb-4  ">
                <h4 className = "text-center" >Post Motivation</h4>
            </div>

            <Form {...layout} form={form} >
                <Form.Item 
                name = "title"
                rules = {[{
                    required:true,
                    message:"Motivation title is required"
                }]}
                label = "Title" >
                    <Input placeholder = "Motivation title"  style = {{height:"50px",borderRadius:"10px"}} />
                </Form.Item>
                <Form.Item 
                name = "description"
                rules = {[
                    {
                        required:true,
                        message:"Motivation description is required"
                    }
                ]}
                label="Description" >
                    <Input.TextArea placeholder="Motivation description" rows = "4" style={{ borderRadius: "10px" }} />
                </Form.Item>
                <div style = {{width:"100%",display:"flex",justifyContent:"center"}} className="submit-button mt-4">
                    <Button htmlType = "submit" id = "submit-buton" shape = "round"  >Post Motivation</Button>
                </div>
                
            </Form>
            
        </Drawer>
    )
}

export default AddMotivationDrawer
