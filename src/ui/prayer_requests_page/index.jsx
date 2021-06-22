import { Badge, Card, Divider, List, message, Tag, Tooltip, } from 'antd'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import "./styles/index.scss"
import ListDescription from './listDescription'
import { CheckOutlined, DeleteOutlined, EyeInvisibleOutlined, EyeOutlined, CloseOutlined } from "@ant-design/icons"
import { connect } from 'react-redux'
import { markAsDone, markAsRead } from '../../state_mamger/functions/prayerRequest'
import DeletePromptModal from './deletePromptModal'
import { seo } from '../../utils/customPageHeader'
import { adminOnly, readWriteOnly } from '../../utils/permissions'






const PrayerRequestsPage = ({ requestsInfo, markRead, markDone }) => {
    const [state, setState] = useState({
        deleteModalVisible: false,
    })

    const [currentPrayer, setCurrentPrayer] = useState({})
    const closeDeleteModal = () => {
        setState({
            ...state,
            deleteModalVisible: false
        })
    }

    const openDelteModal = () => {
        setState({
            ...state,
            deleteModalVisible: true
        })
    }
    const setCurPrayer = (prayer) => {
        setCurrentPrayer(prayer)
    }
    useEffect(() => {
        seo({
            title: "SamTv | Prayer requests",
            metaDescription: "Sam Tv prayer requests posted by users of the mobile app"
        })
    }, [])
    return (
        <div className="prayer-requests container" >
            <DeletePromptModal prayer={currentPrayer} onClose={closeDeleteModal} visible={state.deleteModalVisible} />
            <Card id="main-card" className="mt-5" >
                <Row>
                    <Col xs="4" ><h6 className="">Prayer requests</h6> </Col>

                    <Badge className="mr-4" showZero count={requestsInfo.data.filter(item => item.is_read === false).length} >
                        <Tag color="green" >New requests</Tag>
                    </Badge>

                    <Badge showZero count={requestsInfo.data.filter(item => item.done === false).length} >
                        <Tag color="royalblue" >Not prayed for</Tag>
                    </Badge>
                </Row>
                <Divider />
                <List loading={requestsInfo.loading || requestsInfo.updateLoading} dataSource={requestsInfo.data}
                    renderItem={(item) => <List.Item
                        actions={[
                            <Tooltip title={!item.is_read ? "Set prayer request as viewed" : "Set prayer request as not viewed"} >

                                {!item.is_read ? (<EyeOutlined style={{ color: "royalblue" }} onClick={() => {
                                    readWriteOnly().then(() => {
                                        markRead(item)
                                    })
                                        .catch(() => {
                                            message.error("Sorry you do not have read/write permission")
                                        })
                                }} />) : (<EyeInvisibleOutlined style={{ color: "red" }} onClick={() => {
                                    readWriteOnly().then(() => {
                                        markRead(item)
                                    })
                                        .catch(() => {
                                            message.error("Sorry you do not have read/write permission")
                                        })
                                }} />)}
                            </Tooltip>
                            ,
                            <Tooltip title={!item.done ? "Mark as prayed for" : "Mark as not prayed for"} >

                                {!item.done ? (<CheckOutlined style={{ color: "green" }} onClick={() => {
                                    readWriteOnly()
                                        .then(() => {
                                            markDone(item)
                                        })
                                        .catch(() => {
                                            message.error("Sorry you do not have read/write permission")
                                        })
                                }} />) : (<CloseOutlined style={{ color: "red" }} onClick={() => {
                                    readWriteOnly()
                                        .then(() => {
                                            markDone(item)
                                        })
                                        .catch(() => {
                                            message.error("Sorry you do not have read/write permission")
                                        })
                                }} />)}
                            </Tooltip>
                            ,
                            <Tooltip title="Delete prayer request" >
                                <DeleteOutlined onClick={() => {
                                    adminOnly()
                                        .then(() => {
                                            setCurPrayer(item)
                                            openDelteModal()
                                        })
                                        .catch(() => {
                                            message.error("Sorry you  do not have admin permissions")
                                        })
                                }} style={{ color: "red" }} />
                            </Tooltip>

                        ]}
                    >
                        <List.Item.Meta title={item.title} description={<ListDescription item={item} />} />
                    </List.Item>}
                    pagination={10} />
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        requestsInfo: state.prayerRequest
    };
}

const mapDispatchToProps = dispatch => {
    return {
        markRead: (prayer) => dispatch(markAsRead(prayer)),
        markDone: prayer => dispatch(markAsDone(prayer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrayerRequestsPage)
