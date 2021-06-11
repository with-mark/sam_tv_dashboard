import React from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import { endStreaming } from '../../state_mamger/functions/samTv'
import { useHistory } from 'react-router-dom'

const StopStreamingModal = ({ visible, onClose, tracks, client, stopStreaming }) => {
    const history = useHistory()
    const onStop = () => {
        onClose()
        stopStreaming(tracks, history, client)
       
        
    }
   
    return (
        <Modal onOk={onStop} onCancel={onClose} visible= {visible} >
            Are you sure you want to end the live stream session?

        </Modal>
    )
}


const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => {
    return {
        stopStreaming: (tracks, history, client) => dispatch(endStreaming(tracks, history, client))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(StopStreamingModal)
