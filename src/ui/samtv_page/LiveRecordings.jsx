import { Card, Image, List, Popconfirm, Popover, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import "./styles/index.scss"
import logo from "../../assets/images/logo.png"
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons"
import StreamDeletePromptModal from './deletePromptModal'
import { connect } from 'react-redux';
import { seo } from '../../utils/customPageHeader';
import LiveRecordingsDescription from './LiveRecordingsDescription';
import { deleteRecordings } from '../../state_mamger/functions/liveRecordings'
import EditRecordingModal from './EditRecordingModal'




const LiveRecordings = ({ recordings, remove }) => {
    const [state, setState] = useState({
        deleteModal: false,
        editRecordingModal: false
    })
    useEffect(() => {
        seo({
            title: "SamTv | Live Recordings",
            metaDescription: "List of all recoridings made during live stream"
        })
    }, [])

    const [selectedRecording, setSelectedRecording] = useState({})




    const setDeleteModal = status => {
        setState({
            ...state,
            deleteModal: status
        })
    }

    const openEditRecordingDrawer = () => {
        setState({
            ...state,
            editRecordingModal: true
        })
    }

    const closeEditRecordingDrawer = () => {
        setState({
            ...state,
            editRecordingModal: false
        })
    }


    console.log(recordings);
    return (
        <div className="sm-tv-page container ">
            <EditRecordingModal 
            onClose = {closeEditRecordingDrawer}
            recording={selectedRecording} visible={state.editRecordingModal} />
            <StreamDeletePromptModal onClose={() => setDeleteModal(false)} visible={state.deleteModal} />
            <Card id="main-card" className="mt-5" >
                <div className="logo">
                    <Image id="logo-image" preview={false} src={logo} />
                </div>
                <div className="text-center header-part">
                    <h5>SamTv Live Recordings</h5>
                </div>

                <List pagination={{ pageSize: 5 }} dataSource={recordings.data} loading={recordings.loading}
                    renderItem={item => (<List.Item>
                        <List.Item.Meta
                            title={<div className="d-flex justify-content-between w-100" >
                                <p>{item.title}</p>
                                <Popover
                                    trigger="click"
                                    content={
                                        <div
                                            className="text-center"
                                            style={{ minWidth: "250px" }}
                                        >
                                            <div className="d-flex justify-content-center my-auto" >
                                                <p className="mx-2 " >Edit</p>
                                                <Tooltip title="Edit event" >
                                                    <EditOutlined onClick={() => {
                                                        setSelectedRecording(item)
                                                        openEditRecordingDrawer()
                                                    }} style={{ color: "royalblue", fontSize: "1rem" }} />
                                                </Tooltip>
                                            </div  >
                                            <hr />
                                            <div className="d-flex justify-content-center">
                                                <Tooltip title="Delete event" >
                                                    <Popconfirm

                                                        title="Are you sure you want to delete this event?"
                                                        okText="Yes"
                                                        cancelText="no"
                                                        onConfirm={() => {
                                                            remove(item)
                                                        }}
                                                        okButtonProps={{ style: { backgroundColor: "#852c2c" } }}
                                                        cancelButtonProps={{ style: { backgroundColor: "red", color: "#ffffff" } }}
                                                        icon={<DeleteOutlined />}
                                                    >
                                                        <div className="d-flex justify-content-center">
                                                            <p className="mx-2 ">Delete</p>

                                                            <Tooltip title="More" >
                                                                <DeleteOutlined style={{ color: "red", fontSize: "1.5rem" }} />

                                                            </Tooltip>
                                                        </div>
                                                    </Popconfirm>

                                                </Tooltip>
                                            </div>
                                        </div>
                                    }

                                    placement="bottomLeft" >
                                    <MoreOutlined style={{ fontSize: "1.5rem", fontWeight: "bold" }} />
                                </Popover>

                            </div>}
                            description={<LiveRecordingsDescription recordings={item} />}
                        />
                    </List.Item>)}
                />





            </Card>


        </div>
    )
}


const mapStateToProps = state => {
    return {
        recordings: state.liveRecordings
    }
}
const mapDispatchToProps = disptach => {
    return {
        remove: (recording) => disptach(deleteRecordings(recording))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LiveRecordings)
