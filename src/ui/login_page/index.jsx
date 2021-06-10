import { Button, Card, Form, Image, Input, message, notification, Spin } from 'antd'
import React, { useState } from 'react'
import './styles/index.scss'
import logo from '../../assets/images/logo.png'
import { setAuthToken, setIsAuth } from '../../utils/local_storage';
import { useHistory } from 'react-router';
import { auth} from '../../utils/networks/firebaseConfig';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };


const LoginPage = () => {
    const history = useHistory()
    const [state,setState]=useState({
      loading:false
    })
    const setLoading = status=>{
      setState({
        ...state,
        loading:status
      })
    }

    const onSumit = values=>{
      setLoading(true)
      auth.signInWithEmailAndPassword(values.email,values.password)
      .then(res=>{
        console.log(res);     
        res.user.getIdToken(true).then(token=>{
          setLoading(false)
          console.log(token);
          setIsAuth(true)
          setAuthToken(token)
          message.success("You have succefully logged in");
          history.push("/")
        })
     
      }).catch(err=>{
        setLoading(false)
        
        console.log(err)
        if (err.code ==='auth/network-request-failed'){
          notification.error({
         
            message:"Network error",
            description:"Check internet connection and try again"
  
          })
        }else{
          notification.error({
         
            message:"Error occured",
            description:String(err)
  
          })
        }
      
      
      }
      )
        // console.log(values);
        // setIsAuth(true)
        // message.success("You have succefully logged in");
        // history.push("/")

  
    }



    return (
        <div className = "login-page" >
            <Card id ="login-card">
              <Spin spinning = {state.loading} >

             
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
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' },{
          type:"email",
          message:"Enter a valid email address"
        }]}
      >
        <Input style = {{height:"45px",borderRadius:"10px"}} />
      </Form.Item>

      <Form.Item
      className = "form-item"
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
                <Input.Password style={{ height: "45px", borderRadius: "10px" }}/>
      </Form.Item>

  

              <Button style={{ height: "45px" }} id = "submit-button" shape = "round" type="primary" htmlType="submit">
          LOGIN
        </Button>
    </Form>
    </Spin>
            </Card>
        </div>
    )
}

export default LoginPage
