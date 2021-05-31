import { Card } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { PlusCircleOutlined } from "@ant-design/icons"

const SermonesPage = () => {
    return (
        <div className = "sermons-page container" >
           <Card id = "main-card" className = "mt-5" >
               <Row>
                   <Col xs = "4" >
                     <h6 className="text-left">List of sermons</h6>
                   </Col>
                   <Col  className = "text-right">
                        <PlusCircleOutlined style = {{color:"green",fontSize:"1.2rem"}} />
                   </Col>

               </Row>
                
           </Card>
        </div>
    )
}

export default SermonesPage
