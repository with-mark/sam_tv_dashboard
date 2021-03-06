import { Button, Card, Form, Image, Input, message, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import './styles/index.scss'
import logo from '../../assets/images/logo.png'
import { setIsAuth, setUserInfo } from '../../utils/local_storage';
import { useHistory } from 'react-router';
import { auth, db } from '../../utils/networks/firebaseConfig';
import { seo } from '../../utils/customPageHeader';
import CustomSpinner from '../../utils/ui/customSpinner/CustomSpinner';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const LoginPage = () => {
  const history = useHistory()
  const [state, setState] = useState({
    loading: false
  })
  const setLoading = status => {
    setState({
      ...state,
      loading: status
    })
  }

  useEffect(() => {
    seo({ title: "SamTv | Login" })
  }, [])

  const onSumit = values => {
    setLoading(true)
    auth.signInWithEmailAndPassword(values.email, values.password)
      .then(res => {
        db.collection("userinfo").doc(res.user.uid)
          .get()
          .then((user) => {
            if (!user.data()) {
              setLoading(false)
              message.error("Sorry you do not have permission log into this application")
              return;
            } else {
              setLoading(false)
              setIsAuth(true)
              setUserInfo({ id: user.id, ...user.data() })
              message.success("You have succefully logged in");
              history.push("/")
            }

          }).catch(() => {
            setLoading(false)
            message.error("Sorry you do not have permission log into this application")
          })


      }).catch(err => {
        setLoading(false)

        console.log(err)
        if (err.code === 'auth/network-request-failed') {
          notification.error({

            message: "Network error",
            description: "Check internet connection and try again"

          })
        } else {
          notification.error({

            message: "Error occured",
            description: String(err)

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
    <div className="login-page" >
      <Card id="login-card">
        <CustomSpinner spinning={state.loading} >


          <div className="logo">
            <Image id="logo" preview={false} src={logo} alt="Logo" />

          </div>
          <div className="header">
            <h4 className="text-center ml-5 mb-3">
              Administrator's Login
            </h4>
          </div>
          <Form
            onFinish={onSumit}
            {...layout}
            name="loginForm"

          >
            <Form.Item
              className="form-item"
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }, {
                type: "email",
                message: "Enter a valid email address"
              }]}
            >
              <Input style={{ height: "45px", borderRadius: "10px" }} />
            </Form.Item>

            <Form.Item
              className="form-item"
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password style={{ height: "45px", borderRadius: "10px" }} />
            </Form.Item>



            <Button style={{ height: "45px" }} id="submit-button" shape="round" htmlType="submit">
              LOGIN
            </Button>
          </Form>
        </CustomSpinner>
      </Card>
    </div>
  )
}

export default LoginPage
