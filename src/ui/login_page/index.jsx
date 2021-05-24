import { Button, Card, Form, Image, Input, message } from 'antd'
import React from 'react'
import './styles/index.scss'
import logo from '../../assets/images/logo.png'
import { setIsAuth } from '../../utils/local_storage';
import { useHistory } from 'react-router';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };


const LoginPage = () => {
    const history = useHistory()

    const onSumit = values=>{
        console.log(values);
        setIsAuth(true)
        message.success("You have succefully logged in");
        history.push("/")
  
    }
    return (
        <div className = "login-page" >
            <Card id ="login-card">
                <div className="logo">
                <Image id ="logo"  preview = {false} src = {logo} alt = "Logo" />

                </div>
                <div className="header">
                    <h4 className="text-center ml-5 mb-3">
                        Adminstrator's Login
                    </h4>
                </div>
            <Form
            onFinish = {onSumit}
      {...layout}
      name="loginForm"
     
    >
      <Form.Item
      className = "form-item"
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
      className = "form-item"
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

  

        <Button id = "submit-button" shape = "round" type="primary" htmlType="submit">
          LOGIN
        </Button>
    </Form>
            </Card>
        </div>
    )
}

export default LoginPage
