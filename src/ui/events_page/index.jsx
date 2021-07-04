import { Card, Divider, Image, List, Tooltip, Popconfirm, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusCircleOutlined } from "@ant-design/icons"
import CreateEventsDrawer from "./addEventsDrawer"
import { connect } from 'react-redux'
import EditEventsDrawer from './editEventsDrawer'
import { deleteEvent } from '../../state_mamger/functions/events'
import { seo } from '../../utils/customPageHeader'

const EventsPage = ({ eventsInfo, removeEvent }) => {
    const [state, setState] = useState({
        addDrawer: false,
        editDrawer: false,
        deleteModal: false
    })


    const [selelctedEvents, setSelectedEvents] = useState({})

    const closeAddDrawer = () => {
        setState({
            ...state,
            addDrawer: false
        })

    }

    const openAddDrawer = () => {
        setState({
            ...state,
            addDrawer: true
        })
    }
    const closeEditDrawer = () => {
        setState({
            ...state,
            editDrawer: false
        })

    }

    const openEditDrawer = () => {
        setState({
            ...state,
            editDrawer: true
        })

    }
    useEffect(() => {
        seo({
            title: "SamTv | Events",
            metaDescription: "All schedled events for Prophet Samson Amoateng's ministry"
        })
    }, [])
    return (
        <div className="sermons-page container" >
            <EditEventsDrawer setEvent={setSelectedEvents} event={selelctedEvents} visible={state.editDrawer} closeModal={closeEditDrawer} />
            <CreateEventsDrawer closeModal={closeAddDrawer} visible={state.addDrawer} />
            <Card id="main-card" className="mt-5" >
                <Row>
                    <Col xs="4" >
                        <h6 className="text-left">List of events</h6>
                    </Col>
                    <Col className="text-right">
                        <PlusCircleOutlined onClick={openAddDrawer} style={{ color: "green", fontSize: "1.2rem" }} />
                    </Col>

                </Row>
                <Divider />

                <List
                    
                    dataSource={eventsInfo.data}
                    loading={eventsInfo.loading}
                    pagination={10}
                    renderItem={(item) => <List.Item
                    >
                        <List.Item.Meta title={(<div className="d-flex justify-content-between w-100" >
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
                                                    setSelectedEvents(item)
                                                    openEditDrawer()
                                                }} style={{ color: "royalblue", fontSize: "1rem" }} />
                                            </Tooltip>
                                        </div  >
                                            <Divider/>
                                        <div className="d-flex justify-content-center">
                                            <Tooltip title="Delete event" >
                                                <Popconfirm

                                                    title="Are you sure you want to delete this event?"
                                                    okText="Yes"
                                                    cancelText="no"
                                                    onConfirm={() => {
                                                        removeEvent(item)
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

                        </div>)}
                            description={<div className="mt-3">

                                <Row>
                                    {
                                        item.registration_link && (<Col xs="12"  >
                                            <a className="" target="blank" href={item.registration_link}>
                                                Register here
                                            </a>
                                        </Col>
                                        )
                                    }

                                    <Col xs="12" >
                                        <p> {item.caption} </p>
                                    </Col>
                                </Row>
                                <Image width="100%" src={item.cover_image} />


                            </div>}

                        />
                    </List.Item>}
                />

            </Card>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        eventsInfo: state.events
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeEvent: (event) => dispatch(deleteEvent(event))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage)
