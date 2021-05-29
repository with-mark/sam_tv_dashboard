import { Badge, Card, Divider, List, Tag, Tooltip, } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import "./styles/index.scss"
import ListDescription from './listDescription'
import { CheckOutlined, DeleteOutlined, EyeInvisibleOutlined, EyeOutlined ,CloseOutlined} from "@ant-design/icons"
import { connect } from 'react-redux'
import {  markAsDone, markAsRead } from '../../state_mamger/functions/prayerRequest'
import DeletePromptModal from './deletePromptModal'






const PrayerRequestsPage = ({requestsInfo,markRead,markDone}) => {
       const [state,setState]= useState({
           deleteModalVisible:false,
       })

       const [currentPrayer,setCurrentPrayer] = useState({})
    const closeDeleteModal =()=>{
           setState({
               ...state,
               deleteModalVisible:false
           })
       }

    const openDelteModal=()=>{
        setState({
            ...state,
            deleteModalVisible:true
        })
    }
    const setCurPrayer =(prayer)=>{
        setCurrentPrayer(prayer)
    }
    return (
        <div className = "prayer-requests container" > 
        <DeletePromptModal prayer = {currentPrayer} onClose ={closeDeleteModal} visible = {state.deleteModalVisible} />
            <Card id = "main-card" className = "mt-5" >
                <Row>
                    <Col xs = "4" ><h6 className="">Prayer requests</h6> </Col>
                    
                    <Badge className = "mr-4" showZero count = {requestsInfo.data.filter(item=>item.is_read ===false).length} >
                    <Tag color = "green" >New requests</Tag>
                    </Badge>
                        
                    <Badge showZero count = {requestsInfo.data.filter(item=>item.done ===false).length} >
                    <Tag color="royalblue" >Not prayed for</Tag>
                    </Badge>
                </Row>
                <Divider/>
                <List loading = {requestsInfo.loading || requestsInfo.updateLoading }  dataSource = {requestsInfo.data} 
                    renderItem = {(item)=><List.Item 
                    actions = {[
                        <Tooltip title ={!item.is_read? "Set prayer request as viewed":"Set prayer request as not viewed"} >
                         
                        {!item.is_read?(   <EyeOutlined style = {{color:"royalblue"}} onClick={()=>{
                            markRead(item)
                        }} />):(   <EyeInvisibleOutlined style = {{color:"red"}} onClick={()=>{
                            markRead(item)
                        }} />)}
                        </Tooltip>
                        ,
                        <Tooltip title = {!item.done?"Mark as prayed for":"Mark as not prayed for"} >
                      
                        {!item.done? (<CheckOutlined style = {{color:"green"}} onClick = {()=>{
                            markDone(item)
                        }} />):(       <CloseOutlined style = {{color:"red"}} onClick = {()=>{
                            markDone(item)
                        }} />)}
                        </Tooltip>
                      ,
                        <Tooltip title = "Delete prayer request" >
                            <DeleteOutlined onClick = {()=>{
                            setCurPrayer(item)
                            openDelteModal()
                        }} style = {{color:"red"}}/>
                        </Tooltip>
                      
                    ]}
                    >
                        <List.Item.Meta title = {item.title} description = {<ListDescription item = {item} />} />
                    </List.Item>}
                pagination  = {10} />
            </Card>
        </div>
    )
}

const mapStateToProps =(state) =>{
    return{
        requestsInfo: state.prayerRequest
    } ;
}

const mapDispatchToProps = dispatch=>{
    return {
        markRead:(prayer)=>dispatch(markAsRead(prayer)),
        markDone:prayer=>dispatch(markAsDone(prayer)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PrayerRequestsPage)
