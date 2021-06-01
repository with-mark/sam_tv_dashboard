import { Card, Divider, List, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons"
import  "./styles/index.scss"
import DetailedDescription from './detailedDescription'
import SermonVideoModal from './videoModal'
import CreateSermonDrawer from './createSermonDrawer'
import { connect } from 'react-redux'
import EditSermonDrawer from './editSermonDrawer'





const SermonesPage = ({sermons}) => {
    const [selectedSermon,setSelectedSermon] = useState({})
    const [state,setState] = useState({
        videoModal:false,
        sermonDrawer:false,
        editDrawer:false
    })
    const setEditDrawer = status=>{
        setState({
            ...state,
            editDrawer:status
        })
    }
    const setSermonDrawer = status=>{
        setState({
            ...state,
            sermonDrawer:status
        })
    }
    const setVideoModal=status=>{
        setState({
            ...state,
            videoModal:status
        })
    }
    const onPlay =(status)=>{
        setVideoModal(status)
    }
    return (
        <div className = "sermons-page container" >
            <CreateSermonDrawer onClose = {()=>setSermonDrawer(false)} visible = {state.sermonDrawer} />
            <EditSermonDrawer onClose  = {()=>setEditDrawer(false)} item = {selectedSermon} visible = {state.editDrawer} />
            <SermonVideoModal sermon = {selectedSermon} onclose = {()=>{setVideoModal(false)}} visible = {state.videoModal} />
           <Card id = "main-card" className = "mt-5" >
               <Row>
                   <Col xs = "6" >
                     <h6 className="text-left">List of sermons</h6>
                   </Col>
                   <Col  className = "text-right">
                        <PlusCircleOutlined 
                        onClick = {()=>setSermonDrawer(true)}
                        style = {{color:"green",fontSize:"1.2rem"}} />
                   </Col>

               </Row>
               <Divider/>
                <List loading = {sermons.loading} pagination = {10} dataSource = {sermons.data} renderItem = {(item)=><List.Item 
                actions= {[
                    <Tooltip title = "Edit Sermon">
                    <EditOutlined
                    onClick = {()=>{
                        setSelectedSermon(item)
                        setEditDrawer(true)
                       
                    }}
                    style = {{color:"blue",}} />
                    </Tooltip  >,
                    <Tooltip title = "Delete sermon" >
                    <DeleteOutlined style = {{color:"red"}} />
                    </Tooltip>,
                ]}
                >
                    <List.Item.Meta title = {item.title} description = {<DetailedDescription onPlay = {onPlay} sermon = {item} />} />
                </List.Item>} />
           </Card>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        sermons:state.sermons
    };
}

export default connect(mapStateToProps)(SermonesPage)
