import { Card, Divider,  List, Tooltip ,Popconfirm} from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import "./styles/index.scss"
import {  DeleteOutlined, EditOutlined, PlusCircleOutlined} from "@ant-design/icons"
import { connect } from 'react-redux'
import AddTestimoniesDrawer from './addTestimoniesDrawer'
import EditTestimonyDrawer from './editTestimonyDrawer'
import TestimonyDescription from './listDescription'
import { deleteTestimony } from '../../state_mamger/functions/testimonies'



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
                    actions = {[
                        <Tooltip title ="Edit testimony">
                         
                        <EditOutlined onClick = {()=>{
                            setSelectedItem(item)
                                openTestimonyModal()
                        }} style = {{color:"royalblue"}} />
                        </Tooltip>
                        ,
                        
                            <Tooltip title = "Delete Testimony" >
                                <Popconfirm 
                                okText = "yes"
                                cancelText = "No"
                                onConfirm = {()=>{remove(item)}}
                                title = "Are you sure you want to delete this testimony?" >
                                
                                    <DeleteOutlined style={{ color: "red" }} />

                                </Popconfirm>

                            </Tooltip>
                      
                    ]}
                    
                >
                    <List.Item.Meta title={item.title} description={<TestimonyDescription item = {item} />} />
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
