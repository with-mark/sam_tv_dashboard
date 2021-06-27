import React, { useState } from 'react'
import { Modal, Form, Avatar, Button, Divider, Input,  Select, message } from "antd"
import "./styles/profileModal.scss"
import { UserOutlined } from '@ant-design/icons'
import { v4 } from "uuid"
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { readWriteOnly } from '../../utils/permissions'
import { db, storage } from '../../utils/networks/firebaseConfig'
import { getUserInfoAction } from '../../state_mamger/functions/userInfo'
import { setUserInfo } from '../../utils/local_storage'
import CustomSpinner from '../../utils/ui/customSpinner/CustomSpinner'

const ProfileModal = ({ vidible, onCancel, userInfo, getUserInfo }) => {
    const [values, setValues] = useState({
        name: userInfo.name,
        email: userInfo.email
    })
    const [role, setRole] = useState(userInfo.role)
    const [file, setFile] = useState(null)

    const [loading, setLoading] = useState(false)



    const onChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const onFinish = () => {
        console.log(values);
        readWriteOnly()
            .then(() => {
                setLoading(true)
                db.collection('userinfo')
                    .doc(userInfo.id)
                    .update({
                        name: values.name || userInfo.name,
                        role: values.role || userInfo.role,
                        email: values.email || userInfo.email
                    }).then(() => {
                        setLoading(false)
                        setUserInfo({
                            ...userInfo,
                            name: values.name || userInfo.name,
                            role: values.role || userInfo.role,
                            email: values.email || userInfo.email
                        })
                        getUserInfo({
                            ...userInfo,
                            name: values.name || userInfo.name,
                            role: values.role || userInfo.role,
                            email: values.email || userInfo.email
                        })
                        onCancel()
                        message.success("You have successfully updated you profile")
                    }).catch(err => {
                        console.log(1);
                        setLoading(false)
                        message.error(`Updating user profile failed. \n Reason: ${String(err)} `)
                    })

            }).catch(() => {
                message.error("Sorry! You do not have read/write permission")
            })
    }






    const onUpload = () => {

        readWriteOnly()
            .then(() => {
                if (!file) {
                    message.error("File field is required")
                    return;
                }

                if (userInfo.photoUrl) {

                    storage.ref()
                        .child(userInfo.fileRef)
                        .delete()
                }
                setLoading(true)
                const basePath = "images/profileImage"
                const filename = `${v4()}-${file.name}`
                storage.ref(`${basePath}/${filename}`)
                    .put(file)
                    .then(() => {
                        storage.ref(basePath)
                            .child(filename)
                            .getDownloadURL()
                            .then(photoUrl => {
                                const doc = db.collection('userinfo')
                                    .doc(userInfo.id)
                                doc.update({
                                    photoUrl,
                                    fileRef: `${basePath}/${filename}`
                                }).then(() => {
                                    doc.get()
                                        .then((doc) => {
                                            setLoading(false)
                                            setUserInfo({ id: doc.id, ...doc.data() })
                                            getUserInfo({ id: doc.id, ...doc.data() })
                                            onCancel()
                                            message.success("You have successfully updated your profile picture")
                                        })
                                }).catch(err => {
                                    console.log(1);
                                    setLoading(false)
                                    message.error(`Uploading profile image failed. \n Reason: ${String(err)} `)
                                })

                            }).catch(err => {
                                console.log(2);
                                setLoading(false)
                                message.error(`Uploading profile image failed. \n Reason: ${String(err)} `)
                            })
                    }).catch(err => {
                        console.log(3);
                        setLoading(false)
                        message.error(`Uploading profile image failed. \n Reason: ${String(err)} `)
                    })

            }).catch(() => {
                setLoading(false)
                message.error("Sorry! You do not have read/write permission")
            })

    }
    return (
        <Modal visible={vidible} onCancel={onCancel} footer={null} >
            <CustomSpinner spinning={loading} >
                <div className="inner">
                    <div className="avatar d-flex justify-content-center">
                        <Avatar src={userInfo.photoUrl} size={144} icon={<UserOutlined />} />

                    </div>
                    <div className="form1 mt-5 d-flex justify-content-center ">
                        <Form onFinish={onUpload} className="d-flex flex-column flex-sm-row " >
                            <Form.Item  >
                                <input accept="image/*" onChange={e => { setFile(e.target.files[0]) }} type="file" />
                            </Form.Item>
                            <div className="change-profile-btn">
                                <Button htmlType="submit" icon={<FontAwesomeIcon className="mx-2" icon={faUpload} />} id="profileBtn" shape="round" > Change profile picture </Button>
                            </div>
                        </Form>
                    </div>
                    <Divider />

                    <Form onFinish={onFinish} >
                        <Form.Item label="Full name" >
                            <Input onChange={onChange} name="name" accept="image/*" value={values.name || userInfo.name} />
                        </Form.Item>
                        <Form.Item label="User role" >
                            <Select onChange={setRole} disabled={userInfo.role !== "admin"} value={role || userInfo.role} >
                                <Select.Option value="admin" > Admin </Select.Option>
                                <Select.Option value="read" > Read </Select.Option>
                                <Select.Option value="read_write" > Read/Write </Select.Option>
                                <Select.Option value="samtv" > SamTv </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="User email" >
                            <Input disabled value={values.email || userInfo.email} />
                        </Form.Item>
                        <div className="change-profile-btn d-flex justify-content-center ">
                            <Button className="px-5" id="submitbtn" shape="round" htmlType="submit" > Edit profile </Button>
                        </div>
                    </Form>
                </div>
            </CustomSpinner>
        </Modal>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getUserInfo: (userInfo) => dispatch(getUserInfoAction(userInfo))
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal)
