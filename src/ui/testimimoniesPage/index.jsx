import { Card, Divider,  List, Tooltip ,Popconfirm, Popover} from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import "./styles/index.scss"
import {  DeleteOutlined, EditOutlined, MoreOutlined, PlusCircleOutlined} from "@ant-design/icons"
import { connect } from 'react-redux'
import AddTestimoniesDrawer from './addTestimoniesDrawer'
import EditTestimonyDrawer from './editTestimonyDrawer'
import TestimonyDescription from './listDescription'
import { deleteTestimony } from '../../state_mamger/functions/testimonies'
import { seo } from '../../utils/customPageHeader'



const TestimoniesPage = ({ testimonyInfo, remove}) => {
    const [addTestimony,setAddTestimony] = useState(false)
    const [editTestimony, seteditTestimony] = useState(false)
    const [selectedItem,setSelectedItem] = useState({})

    const closeAddTestimonyModal = ()=>{
        setAddTestimony(false)
    }
    const openAddTestimonyModal=()=>{
        setAddTestimony(true)
    }
    const closeEditTestimonyModal = () => {
        seteditTestimony(false)
    }
    const openTestimonyModal = () => {
        seteditTestimony(true)
    }

    useEffect(() => {
        seo({
            title: "SamTv | Testimonies",
            metaDescription: "Sam Tv testimonies from mobile app users"
        })
    }, [])
    
    return (
        <div className = "testimony-page container" >
            <AddTestimoniesDrawer visible={addTestimony} onClose={closeAddTestimonyModal} />
            <EditTestimonyDrawer testimony={selectedItem} onClose={closeEditTestimonyModal} visible={editTestimony} />

           <Card id = "main-card" className = "mt-5" >
           <Row>
                <Col xs = "6" ><h6 className="">Testimonies</h6> </Col>
                    <Col xs="6" ><h6 className="text-right">
                        <Tooltip title = "Add a testmony">
                            <PlusCircleOutlined onClick={openAddTestimonyModal} style = {{color:"green",fontSize:"1.5rem"}}/>
                        </Tooltip>
                        </h6> </Col>
                </Row>
                <Divider/>
                <List 
                    loading={testimonyInfo.loading || testimonyInfo.deleteLoading}
                renderItem = {item=>(<List.Item
                    
                >
                    <List.Item.Meta 
                    title={(<div className="d-flex justify-content-between w-100" >
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
                                                    openTestimonyModal()
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

                    </div>)}
                    // title={item.title} 
                    
                    
                    
                    description={<TestimonyDescription item = {item} />} />
                </List.Item>)}
                pagination = {10} dataSource = {testimonyInfo.data} />
           </Card>
        </div>
    )
}
const mapStateToProps =(state) =>{
    return{
        testimonyInfo: state.testimony
    } ;
}

const mapDispatchToProps = dispatch=>{
    return{
        remove:(motivation)=>dispatch(deleteTestimony(motivation))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TestimoniesPage)
