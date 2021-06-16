import { Button, Card, Divider, Image, List, Tooltip, Popconfirm } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons"
import CreateEventsDrawer from "./addEventsDrawer"
import { connect } from 'react-redux'
import EditEventsDrawer from './editEventsDrawer'
import { deleteEvent } from '../../state_mamger/functions/events'

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
                        actions={[
                            <Tooltip title = "Edit event" >
                                <EditOutlined onClick={() => {
                                    setSelectedEvents(item)
                                    openEditDrawer()
                                }} style={{ color: "royalblue", fontSize: "1.5rem" }} />
                            </Tooltip>
                            ,
                            <Tooltip title="Delete event" >
                                <Popconfirm
                                    title="Are you sure you want to delete this event?"
                                    okText="Yes"
                                    cancelText="no"
                                    onConfirm = {()=>{
                                        removeEvent(item)
                                    }}
                                    okButtonProps={{ style: { backgroundColor: "#852c2c" } }}
                                    cancelButtonProps={{ style: { backgroundColor: "red", color: "#ffffff" } }}
                                    icon={<DeleteOutlined />}
                                >
                                    <DeleteOutlined style={{ color: "red",fontSize:"1.5rem" }}  />
                                </Popconfirm>

                            </Tooltip>

                        ]}
                    >
                        <List.Item.Meta title={item.title}
                            description={<div className="mt-3">

                                <Row>
                                    <Col>
                                        <p> {item.caption} </p>
                                    </Col>
                                    <Button

                                        target="blank" style={{ color: "royalblue", borderColor: "royalblue" }} shape="round" size="small" href={item.registration_link} >Register here</Button>
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
