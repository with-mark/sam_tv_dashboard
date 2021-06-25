import { Result,  Modal } from 'antd';
import React from 'react'

const AlreadyRecordingPrompt = ({ visible, onCLose }) => {
    return (
        <Modal  visible={visible} onCancel={onCLose} footer={null} >
            <Result
                status="error"
                title="Live stream end failed"
                subTitle="You are currently recording. Make sure you end recording before ending live stream"
            />

        </Modal>
    )
}

export default AlreadyRecordingPrompt
