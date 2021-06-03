import { Button, Card, Divider, Image, List } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons"
import CreateEventsDrawer from "./addEventsDrawer"
import { connect } from 'react-redux'
import EditEventsDrawer from './editEventsDrawer'

const EventsPage = ({eventsInfo}) => {
    const [state,setState] = useState({
        addDrawer:false,
        editDrawer:false,
        deleteModal:false
    })


    const [selelctedEvents,setSelectedEvents]  =useState({})
    
    const closeAddDrawer = ()=>{
        setState({
            ...state,
            addDrawer:false
        })
        
    } 
    
    const openAddDrawer =()=>{
        setState({
            ...state,
            addDrawer:true
        })
    }
    const closeEditDrawer = ()=>{
        setState({
            ...state,
            editDrawer:false
        })
        
    } 
    
    const openEditDrawer =()=>{
        setState({
            ...state,
            editDrawer:true
        })
        const closeDeleteModal = ()=>{
            setState({
                ...state,
                deleteModal:false
            })
            
        } 
        
        const openDeleteModal =()=>{
            setState({
                ...state,
                deleteModal:true
            })
        }
    }
    return (
        <div className = "sermons-page container" >
            <EditEventsDrawer setEvent = {setSelectedEvents} event = {selelctedEvents} visible = {state.editDrawer} closeModal = {closeEditDrawer}  />
            <CreateEventsDrawer closeModal = {closeAddDrawer} visible= {state.addDrawer} />
           <Card id = "main-card" className = "mt-5" >
               <Row>
                   <Col xs = "4" >
                     <h6 className="text-left">List of events</h6>
                   </Col>
                   <Col  className = "text-right">
                        <PlusCircleOutlined onClick={openAddDrawer} style = {{color:"green",fontSize:"1.2rem"}} />
                   </Col>

               </Row>
                <Divider/>

                <List
                dataSource = {eventsInfo.data}
                loading = {eventsInfo.loading}
                pagination = {10}
                renderItem = {(item)=><List.Item
                actions = {[
                    <EditOutlined onClick = {()=>{
                        // setSelectedEvents({})
                        setSelectedEvents(item)
                        openEditDrawer()
                    }} style = {{color:"royalblue"}}  />,
                    <DeleteOutlined onClick = {()=>{}} style = {{color:"red"}}/>
                ]}
                >
                    <List.Item.Meta title = {item.title}
                    description = {<div className = "mt-3">
                        
                        <Row>
                            <Col>
                            <p> {item.caption} </p>
                            </Col>
                            <Button
                            
                            target="blank" style = {{color:"royalblue",borderColor:"royalblue"}} shape = "round" size = "small" href= {item.registration_link} >Register here</Button>
                        </Row>
                        <Image width = "100%" src = {item.cover_image} />
                       

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
    } ;
}

export default connect(mapStateToProps)(EventsPage)
