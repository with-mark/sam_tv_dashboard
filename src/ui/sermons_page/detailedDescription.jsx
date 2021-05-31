import { PlayCircleOutlined } from '@ant-design/icons'
import { message } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "./styles/detailedDescription.scss"

const DetailedDescription = ({sermon,onPlay}) => {
    return (
        <div>
            
            <Row>
            <Col xs = "12" sm = "12" md = "6" >

                    <p> {sermon.message} </p>
                </Col>
                <Col  xs = "12" sm = "12" md = "3" >
                    <div className="image-background">
                        <div className="overlay">
                            <div className="image">
                                <PlayCircleOutlined
                                onClick = {()=>{
                                    onPlay(sermon,true)}}
                                style = {{fontSize:"4rem",zIndex:"100"}} />

                            </div>
                        </div>
                    </div>
                </Col>
               
            </Row>
           
        </div>
    )
}

export default DetailedDescription
