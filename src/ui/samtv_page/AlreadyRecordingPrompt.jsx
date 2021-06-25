import { Result, Button, Typography, Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import React from 'react'
const { Paragraph, Text } = Typography;

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
