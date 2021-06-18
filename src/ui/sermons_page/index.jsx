import { Card, Divider, List, Popconfirm, Popover, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusCircleOutlined } from "@ant-design/icons"
import "./styles/index.scss"
import DetailedDescription from './detailedDescription'
import SermonVideoModal from './videoModal'
import CreateSermonDrawer from './createSermonDrawer'
import { connect } from 'react-redux'
import EditSermonDrawer from './editSermonDrawer'





const SermonesPage = ({ sermons }) => {
    const [selectedSermon, setSelectedSermon] = useState({})
    const [state, setState] = useState({
        videoModal: false,
        sermonDrawer: false,
        editDrawer: false
    })
    const setEditDrawer = status => {
        setState({
            ...state,
            editDrawer: status
        })
    }
    const setSermonDrawer = status => {
        setState({
            ...state,
            sermonDrawer: status
        })
    }
    const setVideoModal = status => {
        setState({
            ...state,
            videoModal: status
        })
    }
    const onPlay = (status) => {
        setVideoModal(status)
    }
    return (
        <div className="sermons-page container" >
            <CreateSermonDrawer onClose={() => setSermonDrawer(false)} visible={state.sermonDrawer} />
            <EditSermonDrawer onClose={() => setEditDrawer(false)} item={selectedSermon} visible={state.editDrawer} />
            <SermonVideoModal sermon={selectedSermon} onclose={() => { setVideoModal(false) }} visible={state.videoModal} />
            <Card id="main-card" className="mt-5" >
                <Row>
                    <Col xs="6" >
                        <h6 className="text-left">List of sermons</h6>
                    </Col>
                    <Col className="text-right">
                        <PlusCircleOutlined
                            onClick={() => setSermonDrawer(true)}
                            style={{ color: "green", fontSize: "1.2rem" }} />
                    </Col>

                </Row>
                <Divider />
                <List loading={sermons.loading} pagination={10} dataSource={sermons.data} renderItem={(item) => <List.Item

                >
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
                                                    setSelectedSermon(item)
                                                    setEditDrawer(true)
                                                }} style={{ color: "royalblue", fontSize: "1rem" }} />
                                            </Tooltip>
                                        </div  >
                                        <Divider />
                                        <div className="d-flex justify-content-center">
                                            <Tooltip title="Delete event" >
                                                <Popconfirm

                                                    title="Are you sure you want to delete this event?"
                                                    okText="Yes"
                                                    cancelText="no"
                                                    onConfirm={() => {
                                                        // removeEvent(item)
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

                        description={<DetailedDescription onPlay={onPlay} sermon={item} />} />
                </List.Item>} />
            </Card>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        sermons: state.sermons
    };
}

export default connect(mapStateToProps)(SermonesPage)
