import { Card, Divider, List, } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "./styles/index.scss"
import ListDescription from './listDescription'
import { DeleteOutlined, EyeOutlined, SelectOutlined } from "@ant-design/icons"
import { connect } from 'react-redux'






const PrayerRequestsPage = ({requestsInfo}) => {
    console.log(requestsInfo);
    return (
        <div className = "prayer-requests container" > 
            <Card id = "main-card" className = "mt-5" >
                <Row>
                    <Col xs = "8" ><h5 className="">Prayer requests</h5> </Col>
                </Row>
                <Divider/>
                <List loading = {requestsInfo.loading}  dataSource = {requestsInfo.data} 
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

const mapStateToProps =(state) =>{
    return{
        requestsInfo: state.prayerRequest
    } ;
}

export default connect(mapStateToProps)(PrayerRequestsPage)
