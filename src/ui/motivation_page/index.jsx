import { Card, Divider,  List, Tooltip } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import MotivationDescription from './listDescription'
import "./styles/index.scss"
import {  DeleteOutlined, EditOutlined} from "@ant-design/icons"
import { connect } from 'react-redux'



const MotivationPage = ({motivationsInfo}) => {
    return (
        <div className = "motivation-page container" >
           <Card id = "main-card" className = "mt-5" >
           <Row>
                <Col xs = "4" ><h6 className="">Prayer requests</h6> </Col>
                </Row>
                <Divider/>
                <List 
                loading = {motivationsInfo.loading}
                renderItem = {item=>(<List.Item
                    actions = {[
                        <Tooltip title ={!item.is_read? "Set prayer request as viewed":"Set prayer request as not viewed"} >
                         
                        <EditOutlined style = {{color:"royalblue"}} />
                        </Tooltip>
                        ,
                        
                        <Tooltip title = "Delete prayer request" >
                            <DeleteOutlined onClick = {()=>{
                            
                            
                        }} style = {{color:"red"}}/>
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
export default connect(mapStateToProps)(MotivationPage)
