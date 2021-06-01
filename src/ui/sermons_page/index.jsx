import { Card, Divider, List } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { PlusCircleOutlined } from "@ant-design/icons"
import  "./styles/index.scss"
import DetailedDescription from './detailedDescription'
import SermonVideoModal from './videoModal'
import CreateSermonDrawer from './createSermonDrawer'
import { connect } from 'react-redux'





const SermonesPage = ({sermons}) => {
    const [selectedSermon,setSelectedSermon] = useState({})
    const [state,setState] = useState({
        videoModal:false,
        sermonDrawer:false
    })
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
    const onPlay =(sermon,status)=>{
        setSelectedSermon(sermon)
        setVideoModal(status)
    }
    return (
        <div className = "sermons-page container" >
            <CreateSermonDrawer onClose = {()=>setSermonDrawer(false)} visible = {state.sermonDrawer} />
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
                <List loading = {sermons.loading} pagination = {10} dataSource = {sermons.data} renderItem = {(item)=><List.Item>
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
