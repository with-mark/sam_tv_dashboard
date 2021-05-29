import { Card, Divider, List, } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "./styles/index.scss"
import ListDescription from './listDescription'
import { DeleteOutlined, EyeInvisibleOutlined, EyeOutlined, MoreOutlined, SelectOutlined } from "@ant-design/icons"
import { connect } from 'react-redux'
import { markAsRead } from '../../state_mamger/functions/prayerRequest'






const PrayerRequestsPage = ({requestsInfo,markRead}) => {
    console.log(requestsInfo);
    return (
        <div className = "prayer-requests container" > 
            <Card id = "main-card" className = "mt-5" >
                <Row>
                    <Col xs = "8" ><h5 className="">Prayer requests</h5> </Col>
                </Row>
                <Divider/>
                <List loading = {requestsInfo.loading || requestsInfo.loading }  dataSource = {requestsInfo.data} 
                    renderItem = {(item)=><List.Item 
                    actions = {[
                        <MoreOutlined/>,
                        <EyeInvisibleOutlined onClick={markRead} />,
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

const mapDispatchToProps = dispatch=>{
    return {
        markRead:(id,prayer)=>dispatch(markAsRead(id,prayer))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PrayerRequestsPage)
