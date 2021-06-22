import { Card, Statistic } from 'antd'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { liveStreamStatus } from '../../state_mamger/functions/liveStreams'
import { seo } from '../../utils/customPageHeader'

const StatisticsPage = ({
    motivationData,
    streamData,
    prayerRequest,
    sermons,
    events,
    testimonies
}) => {
    useEffect(() => {
        seo()
    }, [])
    return (
        <div className="stattistics-page" >
            <Container className="mt-5" >
                <Row>
                    <Col className="mt-2" xs="12" sm="12" md="6" >
                        <Card style={{ height: "150px" }} >
                            <Statistic value={motivationData.data.length} className="text-center" title="Number of Motivations posted" loading={motivationData.loading} />

                        </Card>
                    </Col>
                    <Col className="mt-2" xs="12" sm="12" md="6" >
                        <Card style={{ height: "150px" }} >
                            <Row>
                                <Col>
                                    <Statistic value={motivationData.data.length} className="text-center" title="Number of Prayer request recieved" loading={motivationData.loading} />
                                </Col>
                                <Col>
                                    <Statistic value={motivationData.data.length} className="text-center" title={<p style={{ color: "green" }} >Number of Prayer unread prayer requests</p>} loading={motivationData.loading} />
                                </Col>
                            </Row>

                        </Card>
                    </Col>
                    <Col className="mt-2" xs="12" sm="12" md="6" >
                        <Card style={{ height: "150px" }} >
                            <Statistic value={motivationData.data.length} className="text-center" title="Number of Motivations posted" loading={motivationData.loading} />

                        </Card>
                    </Col>

                    <Col className="mt-2" xs="12" sm="12" md="6" >
                        <Card style={{ height: "150px" }} >
                            <Statistic value={prayerRequest.data.length} className="text-center" title="Number of prayer requests" loading={prayerRequest.loading} />

                        </Card>
                    </Col>

                    <Col className="mt-2" xs="12" sm="12" md="6" >
                        <Card style={{ height: "150px" }} >
                            <Statistic value={sermons.data.length} className="text-center" title="Number of Sermons posted" loading={sermons.loading} />
                        </Card>
                    </Col>


                    <Col className="mt-2" xs="12" sm="12" md="6" >
                        <Card style={{ height: "150px" }} >
                            <Statistic value={events.data.length} className="text-center" title="Number of Events posted" loading={events.loading} />
                        </Card>
                    </Col>

                    <Col className="mt-2" xs="12" sm="12" md="6" >
                        <Card style={{ height: "150px" }} >
                            <Statistic value={testimonies.data.length} className="text-center" title="Number of testimonies posted" loading={testimonies.loading} />
                        </Card>
                    </Col>

                    <Col className="mt-2" xs="12" sm="12" md="6" >
                        <Card style={{ height: "150px" }} >
                            <Statistic value={streamData.data.filter(item => item.status === liveStreamStatus.Pending).length} className="text-center" title="Number of Live streams schedled" loading={streamData.loading} />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        motivationData: state.motivation,
        streamData: state.liveStreams,
        prayerRequest: state.prayerRequest,
        sermons: state.sermons,
        events: state.events,
        testimonies: state.testimony



    };
}
export default connect(mapStateToProps)(StatisticsPage)
