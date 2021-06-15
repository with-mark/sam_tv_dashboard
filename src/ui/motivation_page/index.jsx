import { Card, Divider,  List, Tooltip ,Popconfirm} from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import MotivationDescription from './listDescription'
import "./styles/index.scss"
import {  DeleteOutlined, EditOutlined, PlusCircleOutlined} from "@ant-design/icons"
import { connect } from 'react-redux'
import AddMotivationDrawer from './addMotivationDrawer'
import { deleteMotivation } from '../../state_mamger/functions/motivations'



const MotivationPage = ({ motivationsInfo, remove}) => {
    const [addMotivation,setAddMotivation] = useState(false)

    const closeAddMotivationModal = ()=>{
        setAddMotivation(false)
    }
    const openAddMotivationModal=()=>{
        setAddMotivation(true)
    }
    
    return (
        <div className = "motivation-page container" >
            <AddMotivationDrawer visible={addMotivation} onClose={closeAddMotivationModal} />
           <Card id = "main-card" className = "mt-5" >
           <Row>
                <Col xs = "6" ><h6 className="">Motivations</h6> </Col>
                    <Col xs="6" ><h6 className="text-right">
                        <Tooltip title = "Add a motivation" >
                            <PlusCircleOutlined onClick={openAddMotivationModal} style = {{color:"green",fontSize:"1.5rem"}} />
                        </Tooltip>
                        </h6> </Col>
                </Row>
                <Divider/>
                <List 
                    loading={motivationsInfo.loading || motivationsInfo.deleteLoading}
                renderItem = {item=>(<List.Item
                    actions = {[
                        <Tooltip title ={!item.is_read? "Set prayer request as viewed":"Set prayer request as not viewed"} >
                         
                        <EditOutlined style = {{color:"royalblue"}} />
                        </Tooltip>
                        ,
                        
                            <Tooltip title = "Delete motivation" >
                                <Popconfirm 
                                okText = "yes"
                                cancelText = "No"
                                onConfirm = {()=>{remove(item)}}
                                title = "Are you sure you want to delete this motivation?" >
                                
                                    <DeleteOutlined style={{ color: "red" }} />

                                </Popconfirm>

                            </Tooltip>
                      
                    ]}
                    
                >
                    <List.Item.Meta title = {item.title} description = {<MotivationDescription item = {item} />} />
                </List.Item>)}
                pagination = {10} dataSource = {motivationsInfo.data} />
           </Card>
        </div>
    )
}
const mapStateToProps =(state) =>{
    return{
        motivationsInfo:state.motivation
    } ;
}

const mapDispatchToProps = dispatch=>{
    return{
        remove:(motivation)=>dispatch(deleteMotivation(motivation))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MotivationPage)
