import { Button, Card, Form, Image, Input } from 'antd'
import React from 'react'
import './styles/index.scss'
import logo from '../../assets/images/logo.png'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const LoginPage = () => {
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
          Submit
        </Button>
    </Form>
            </Card>
        </div>
    )
}

export default LoginPage
