import { Card, Image, List, Popconfirm, Popover, Space, Table, Tag, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import "./styles/index.scss"
import logo from "../../assets/images/logo.png"
import { Col, Row } from 'react-bootstrap';
import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, PlusCircleOutlined } from "@ant-design/icons"
import CreateStreamDrawer from './createStreamDrawer';
import DetailedStreamDrawer from './detailedDrawer';
import StreamDeletePromptModal from './deletePromptModal'
import { connect } from 'react-redux';
import { seo } from '../../utils/customPageHeader';
import LiveRecordingsDescription from './LiveRecordingsDescription';




const LiveRecordings = ({ recordings }) => {
    const [state, setState] = useState({
        addDrawer: false,
        detailedDrawer: false,
        deleteModal: false,
        selectedStream: {}
    })
    useEffect(() => {
        seo({
            title: "SamTv | Live Recordings",
            metaDescription: "List of all recoridings made during live stream"
        })
    }, [])

    const [selectedStream, setSelectedStream] = useState({})


    const setAddDrawer = status => {
        setState({
            ...state,
            addDrawer: status
        })

    }

    const setDeleteModal = status => {
        setState({
            ...state,
            deleteModal: status
        })
    }

    const setDetailedDrawer = status => {
        setState({
            ...state,
            detailedDrawer: status
        })
    }


console.log(recordings);
    return (
        <div className="sm-tv-page container ">
            <StreamDeletePromptModal onClose={() => setDeleteModal(false)} visible={state.deleteModal} />
            <DetailedStreamDrawer stream={selectedStream} onClose={() => setDetailedDrawer(false)} visible={state.detailedDrawer} />
            <CreateStreamDrawer visible={state.addDrawer} onClose={() => setAddDrawer(false)} />
            <Card id="main-card" className="mt-5" >
                <div className="logo">
                    <Image id="logo-image" preview={false} src={logo} />
                </div>
                <div className="text-center header-part">
                    <h5>SamTv Live Recordings</h5>
                </div>

                <List dataSource = {recordings.data} loading = {recordings.loading}
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
                                                        // setSelectedItem(item)
                                                        // openEditMotivationModal()
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
                                                            // remove(item)
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
                            description = {<LiveRecordingsDescription recordings = {item} />}
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

export default connect(mapStateToProps)(LiveRecordings)
