import { Card, Divider, Image, List, Tooltip } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import MotivationDescription from './listDescription'
import "./styles/index.scss"
import { CheckOutlined, DeleteOutlined, EyeInvisibleOutlined, EyeOutlined ,CloseOutlined, EditOutlined} from "@ant-design/icons"


const getMotivations = ()=>{

    let motivations = []
    for (let i =0;i<20;i++){
        motivations.push({
            id:"sdasdasdasd",
            title:"Some title here",
            description:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
            timestamp:"2020/11/12",
            author:"Pastor Kwasi Yamoah",
            type:"text"
        })
    }
    for (let i =0;i<10;i++){
        motivations.push({
            id:"sdasdasdasd",
            title:"I am a winner",
            author:"Kwaku Osman Sarpon",
            timestamp:"2020-12-12",
            image:"https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=410&q=80",
            type:"image"
        })
    }

    return motivations
}
const MotivationPage = () => {
    return (
        <div className = "motivation-page container" >
           <Card id = "main-card" className = "mt-5" >
           <Row>
                <Col xs = "4" ><h6 className="">Prayer requests</h6> </Col>
                </Row>
                <Divider/>
                <List 
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
                pagination = {10} dataSource = {getMotivations()} />
           </Card>
        </div>
    )
}

export default MotivationPage
