import { Card, Divider, List, } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "./styles/index.scss"
import ListDescription from './listDescription'
import { DeleteOutlined, EyeOutlined, SelectOutlined } from "@ant-design/icons"





const getPrayer = ()=>{
    let prayers = []
for(let i =0; i<20;i++){
    prayers.push({
        id:1,
        title:"Some prayer",
        description:" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta quo quia quasi suscipit officia excepturi, tenetur voluptas hic aperiam eveniet id assumenda dolore laudantium debitis quis ab illo. Sed, maiores ",
        author:"Thomas Sarpong",
        date:"2020-12-12",
        is_read:false,
        done:false
    })
}
return prayers

}

const PrayerRequestsPage = () => {
    return (
        <div className = "prayer-requests container" > 
            <Card id = "main-card" className = "mt-5" >
                <Row>
                    <Col xs = "8" ><h5 className="">Prayer requests</h5> </Col>
                </Row>
                <Divider/>
                <List  dataSource = {getPrayer()} 
                    renderItem = {(item)=><List.Item 
                    actions = {[
                        <EyeOutlined/>,
                        <SelectOutlined/>,
                        <DeleteOutlined/>
                    ]}
                    >
                        <List.Item.Meta title = {item.title} description = {<ListDescription item = {item} />} />
                    </List.Item>}
                pagination  = {10} />
            </Card>
        </div>
    )
}

export default PrayerRequestsPage
