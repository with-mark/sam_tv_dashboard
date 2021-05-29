import { Card, Statistic } from 'antd'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

const StatisticsPage = ({motivationData,streamData}) => {
    return (
        <div className = "stattistics-page" >
            <Container className = "mt-5" >
                <Row>
                    <Col className = "mt-2" xs = "12" sm = "12" md = "6" >
                        <Card style = {{height:"150px"}} >
                            <Statistic value = {motivationData.data.length} className = "text-center" title = "Number of Motivations posted" loading = {motivationData.loading} />

                        </Card>
                    </Col>
                    <Col className = "mt-2" xs = "12" sm = "12" md = "6" >
                        <Card style = {{height:"150px"}} >
                            <Row>
                                <Col>
                                <Statistic value = {motivationData.data.length} className = "text-center" title = "Number of Prayer request recieved" loading = {motivationData.loading} />
                                </Col>
                                <Col>
                                <Statistic value = {motivationData.data.length} className = "text-center" title = {<p style = {{color:"green"}} >Number of Prayer unread prayer requests</p>} loading = {motivationData.loading} />
                                </Col>
                            </Row>

                        </Card>
                    </Col>
                    <Col className = "mt-2" xs = "12" sm = "12" md = "6" >
                        <Card style = {{height:"150px"}} >
                            <Statistic value = {streamData.data.length} className = "text-center" title = "Number of scheduled live streams" loading = {streamData.loading} />

                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
const mapStateToProps =(state) =>{
    return{
        motivationData:state.motvation,
        streamData:state.liveStreams
        
    } ;
}
export default connect(mapStateToProps)(StatisticsPage)
