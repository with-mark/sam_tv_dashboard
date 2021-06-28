import { Card, Image, List, Space, Table, Tag, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import "./styles/index.scss"
import logo from "../../assets/images/logo.png"
import { Col, Row } from 'react-bootstrap';
import { DeleteOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons"
import CreateStreamDrawer from './createStreamDrawer';
import DetailedStreamDrawer from './detailedDrawer';
import StreamDeletePromptModal from './deletePromptModal'
import { connect } from 'react-redux';
import { seo } from '../../utils/customPageHeader';
import LiveRecordingsDescription from './LiveRecordingsDescription';




const LiveRecordings = ({ recordings }) => {
    const [state, setState] = useState({
        addDrawer: false,
        detailedDrawer: false,
        deleteModal: false,
        selectedStream: {}
    })
    useEffect(() => {
        seo({
            title: "SamTv | Live Recordings",
            metaDescription: "List of all recoridings made during live stream"
        })
    }, [])

    const [selectedStream, setSelectedStream] = useState({})


    const setAddDrawer = status => {
        setState({
            ...state,
            addDrawer: status
        })

    }

    const setDeleteModal = status => {
        setState({
            ...state,
            deleteModal: status
        })
    }

    const setDetailedDrawer = status => {
        setState({
            ...state,
            detailedDrawer: status
        })
    }


console.log(recordings);
    return (
        <div className="sm-tv-page container ">
            <StreamDeletePromptModal onClose={() => setDeleteModal(false)} visible={state.deleteModal} />
            <DetailedStreamDrawer stream={selectedStream} onClose={() => setDetailedDrawer(false)} visible={state.detailedDrawer} />
            <CreateStreamDrawer visible={state.addDrawer} onClose={() => setAddDrawer(false)} />
            <Card id="main-card" className="mt-5" >
                <div className="logo">
                    <Image id="logo-image" preview={false} src={logo} />
                </div>
                <div className="text-center header-part">
                    <h5>SamTv Live Recordings</h5>
                </div>

                <List dataSource = {recordings.data} loading = {recordings.loading}
                    renderItem={item => (<List.Item>
                        <List.Item.Meta
                        title = {item.title}
                        description = {<LiveRecordingsDescription recordings = {item} />}
                        />
                    </List.Item>)}
                />





            </Card>


        </div>
    )
}


const mapStateToProps = state => {
    return {
        recordings: state.liveRecordings
    }
}

export default connect(mapStateToProps)(LiveRecordings)
