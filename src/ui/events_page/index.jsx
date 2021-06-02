import { Card, Divider, List } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { PlusCircleOutlined } from "@ant-design/icons"
import CreateEventsDrawer from "./addEventsDrawer"

for (let i =0;i<10;i++){
    
}


const EventsPage = () => {
    const [state,setState] = useState({
        addDrawer:false
    })

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
    return (
        <div className = "sermons-page container" >
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
                
                />

           </Card>
        </div>
    )
}

export default EventsPage
