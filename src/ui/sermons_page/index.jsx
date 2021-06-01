import { Card, List } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { PlusCircleOutlined } from "@ant-design/icons"
import logo from "../../assets/images/logo.png"
import  "./styles/index.scss"
import DetailedDescription from './detailedDescription'
import SermonVideoModal from './videoModal'
import CreateSermonDrawer from './createSermonDrawer'



const getSermons = ()=>{
    let items = []
    for(let i =0; i<10; i++){
        items.push({
            id:1,
            title:"Some title for a fake sermon",
            message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam culpa in eveniet libero corporis deserunt nulla temporibus inventore recusandae sed, architecto consequatur totam est cum earum officia commodi unde eligendi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam culpa in eveniet libero corporis deserunt nulla temporibus inventore recusandae sed, architecto consequatur totam est cum earum officia commodi unde eligendi!Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam culpa in eveniet libero corporis deserunt nulla temporibus inventore recusandae sed, architecto consequatur totam est cum earum officia commodi unde eligendi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam culpa in eveniet libero corporis deserunt nulla temporibus inventore recusandae sed, architecto consequatur totam est cum earum officia commodi unde eligendi! v Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam culpa in eveniet libero corporis deserunt nulla temporibus inventore recusandae sed, architecto consequatur totam est cum earum officia commodi unde eligendi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam culpa in eveniet libero corporis deserunt nulla temporibus inventore recusandae sed, architecto consequatur totam est cum earum officia commodi unde eligendi!`,
            timestamp:"2020-12-09",
            videoLink:"https://youtu.be/qCj9Lm4fRQY",  
        })
    }
    return items
}

const SermonesPage = () => {
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
                <List pagination = {10} dataSource = {getSermons()} renderItem = {(item)=><List.Item>
                    <List.Item.Meta title = {item.title} description = {<DetailedDescription onPlay = {onPlay} sermon = {item} />} />
                </List.Item>} />
           </Card>
        </div>
    )
}

export default SermonesPage
