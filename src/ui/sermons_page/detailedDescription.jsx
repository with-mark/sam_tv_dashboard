import {  Spin } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import "./styles/detailedDescription.scss"
import ReactHtmlParser from "react-html-parser"


import ReactPlayer from 'react-player'
const DetailedDescription = ({sermon}) => {
    const [state,setState] = useState({
        bufferring:true
    })
    return (
        <div>
            
            <Row>
            <Col className = "my-2"  xs = "12" sm = "12" md = "6" >
                <div className="image-background">
                    <div className="overlay">
                      <Spin spinning = {state.bufferring} tip = {<p style = {{color:"#ffffff",textShadow:"none"}} >Video loading ...</p>} >
                          
                        <ReactPlayer controls width = "100%" height = "300px" style = {{borderRadius:"10px"}} onReady = {()=>setState({...state,bufferring:false})} url = {sermon.videoLink}  />
                        
                        </Spin>
                    </div>
                </div>
             
        
                </Col>
            <Col className = "my-2" xs = "12" sm = "12" md = "6" style = {{height:"300px",overflowY:"scroll"}} >

                    <p> {ReactHtmlParser(sermon.message)} </p>
                </Col>
           
               
            </Row>
           
        </div>
    )
}

export default DetailedDescription
