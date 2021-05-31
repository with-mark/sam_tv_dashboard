import { Button, Card, Form, Image, Input, message, Space, Table, Tag, Tooltip } from 'antd'
import React, { useState } from 'react'
import "./styles/index.scss"
import logo from  "../../assets/images/logo.png"
import { Col, Row } from 'react-bootstrap';
import {DeleteOutlined,  EyeOutlined, PlusCircleOutlined} from "@ant-design/icons"
import CreateStreamDrawer from './createStreamDrawer';


  const getStream = ()=>{
      let streams = []
      for(let i=0; i<20; i++){
        streams.push({
            id:i,
            title:"Some title here",
            description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab aut cupiditate dicta cum voluptatum velit voluptatem sint quibusdam esse eligendi, repellat, incidunt iste odit necessitatibus eveniet a aliquid perferendis iure! ",
            status:"Completed"
        })
      }
      return streams
  }
  


  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Decription',
      dataIndex: 'description',
      key: 'description',
      render:text=>(<p>{text.length>100?text.slice(0,100):text} {text.length>100?"...":""} </p>)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render:status=>(<Tag  color = {status ==="pending" ? "yellow":status ==="in_session"?"green":"red"} >{status}</Tag>)
    },
    {
        title:"Actions",
        render:(text,record)=>(
            <Space size="middle">

                <Tooltip title = "View Detailed" >                 
                    <EyeOutlined style ={{color:"royalblue",fontSize:"1rem"}} />
                </Tooltip>
                <Tooltip title ="Delete stream info" >
                <DeleteOutlined style ={{color:"red",fontSize:"1rem"}} />

                </Tooltip>

            </Space>
        )
    }
  ];

const SamTvPage = () => {
    const [state,setState] = useState({
        addDrawer:false
    })
    const setAddDrawer = status=>{
        setState({
            ...state,
            addDrawer:status
        })
    }
    return (
        <div className = "sm-tv-page container ">
            <CreateStreamDrawer visible = {state.addDrawer} onClose = {()=>setAddDrawer(false)} />
        <Card id="main-card" className = "mt-5" >
            <div className="logo">
                <Image id = "logo-image" preview = {false}  src = {logo} />
            </div>
            <div className="text-center header-part">
                <h5>SamTv is offline</h5>
            </div>

            <Row className = "mt-5 " >
                <Col xs = "4 title">
                    <h6>List of streams</h6>
                </Col>
                <Col className = "text-right title2 mr-5" >
                    <Tooltip title = "Create Live Stream" >
                        <PlusCircleOutlined onClick = {()=>setAddDrawer(true)} style = {{fontSize:"1.2rem",color:"green"}} />
                    </Tooltip>
                </Col>
            </Row>

 

                <Table className = "mt-4" columns ={columns} dataSource = {getStream()} pagination = {10} style  = {{overflowX:"scroll"}} />

        </Card>
            
            
        </div>
    )
}

export default SamTvPage
