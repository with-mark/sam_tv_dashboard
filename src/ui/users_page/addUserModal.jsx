import { Button, Form, Input, message, Select, Modal, notification} from 'antd'
import React, { useEffect, useState } from 'react'
import { seo } from '../../utils/customPageHeader'
import { auth, db } from "../../utils/networks/firebaseConfig"
import { adminOnly } from '../../utils/permissions'
import CustomSpinner from '../../utils/ui/customSpinner/CustomSpinner'
import "./styles/modal.scss"

const AddUserModal = ({ visible, onClose }) => {
    const [state, setState] = useState({
        loading: false
    })
    const formItemStyle = {
        width: "90%"
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 24 },
    };

    const setLoading = (loading) => {
        setState({
            ...state,
            loading: loading
        })
    }

    const [form] = Form.useForm()

    const registerUser = (values) => {
        setLoading(true)
        auth.createUserWithEmailAndPassword(values.email, values.password)
            .then(cred => {
                console.log(cred);
                db.collection("userinfo").doc(cred.user.uid).set({ ...values })
                    .then(() => {
                        form.resetFields()
                        setLoading(false)
                        message.success("You have succesfully add a user")
                        onClose()
                    })

            })
            .catch(err => {
                form.resetFields()
                setLoading(false)
                notification.error({
                    message: "Error occured",
                    description: String(err)
                })
                onClose()
            })

    }
    useEffect(() => {
        seo({
            title: "SamTv | User management",
            metaDescription: "Add edit and delete users"
        })
    }, [])
    return (
        <Modal visible={visible} onCancel={onClose} footer={null} >
            <CustomSpinner spinning={state.loading} >


                <h6 className="text-center">Add User</h6>
                <Form form={form} onFinish={(values) => {
                    adminOnly()
                        .then(() => {
                            registerUser(values)
                        })
                        .catch(() => {
                            message.error("Sorry you do not have admin permission")
                        })

                }} {...layout} >
                    <Form.Item style={formItemStyle} name="name" label="Full name"
                        rules={[{ required: true, message: "This Field is required" }]}>
                        <Input placeholder="Enter Users full name" />
                    </Form.Item>
                    <Form.Item label="Email" style={formItemStyle} name="email"
                        rules={[{
                            required: true,
                            message: "Email field is required"
                        },
                        {
                            type: "email",
                            message: "Enter a valid email"
                        }
                        ]}
                    >
                        <Input type="email" placeholder="Enter a email" />

                    </Form.Item>
                    <Form.Item initialValue="read" style={formItemStyle} label="Role" name="role" >
                        <Select>
                            <Select.Option value="admin" > Admin </Select.Option>
                            <Select.Option value="read" > Read </Select.Option>
                            <Select.Option value="read_write" > Read/Write </Select.Option>
                            <Select.Option value="samtv" > SamTv </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item hasFeedback label="Password" style={formItemStyle} name="password"
                        rules={[{
                            required: true,
                            message: "Password field is required"
                        },
                        {
                            min: 6,
                            message: "Password must be more than 6 Characters"
                        }
                        ]}
                    >
                        <Input.Password type="email" placeholder="Enter Password" />

                    </Form.Item>
                    <Form.Item hasFeedback dependencies={["password"]} label="Password Confirm" style={formItemStyle} name="passsword_confirm"
                        rules={[{
                            required: true,
                            message: "Password confirm field is required"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),

                        ]}
                    >
                        <Input.Password type="email" placeholder="Enter Password" />

                    </Form.Item>
                    <div className="submit-btn">
                        <Button htmlType="submit" shape="round" id="btn" >Create user</Button>
                    </div>

                </Form>
            </CustomSpinner>
        </Modal>
    )
}

export default AddUserModal
