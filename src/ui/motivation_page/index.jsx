import { Card, Divider, List, Tooltip, Popconfirm, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import MotivationDescription from './listDescription'
import "./styles/index.scss"
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { connect } from 'react-redux'
import AddMotivationDrawer from './addMotivationDrawer'
import { deleteMotivation } from '../../state_mamger/functions/motivations'
import EditMotivationDrawer from './editMotivationDrawer'
import { seo } from '../../utils/customPageHeader'



const MotivationPage = ({ motivationsInfo, remove }) => {
    const [addMotivation, setAddMotivation] = useState(false)
    const [editMotivation, seteditMotivation] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})

    const closeAddMotivationModal = () => {
        setAddMotivation(false)
    }
    const openAddMotivationModal = () => {
        setAddMotivation(true)
    }
    const closeEditMotivationModal = () => {
        seteditMotivation(false)
    }
    const openEditMotivationModal = () => {
        seteditMotivation(true)
    }
    useEffect(() => {
        seo({ title: "SamTv | Motivation page",
        metaDescription:"Sam Tv motivation quotes posted by pastors to help stregnthen the weak" })
    }, [])

    return (
        <div className="motivation-page container" >
            <AddMotivationDrawer visible={addMotivation} onClose={closeAddMotivationModal} />
            <EditMotivationDrawer motivation={selectedItem} onClose={closeEditMotivationModal} visible={editMotivation} />

            <Card id="main-card" className="mt-5" >
                <Row>
                    <Col xs="6" ><h6 className="">Motivations</h6> </Col>
                    <Col xs="6" ><h6 className="text-right">
                        <Tooltip title="Add a motivation" >
                            <PlusCircleOutlined onClick={openAddMotivationModal} style={{ color: "green", fontSize: "1.5rem" }} />
                        </Tooltip>
                    </h6> </Col>
                </Row>
                <Divider />
                <List
                    loading={motivationsInfo.loading || motivationsInfo.deleteLoading}
                    renderItem={item => (<List.Item

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
                                                        setSelectedItem(item)
                                                        openEditMotivationModal()
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
                            // title = {item.title} 


                            description={<MotivationDescription item={item} />} />
                    </List.Item>)}
                    pagination={10} dataSource={motivationsInfo.data} />
            </Card>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        motivationsInfo: state.motivation
    };
}

const mapDispatchToProps = dispatch => {
    return {
        remove: (motivation) => dispatch(deleteMotivation(motivation))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MotivationPage)
