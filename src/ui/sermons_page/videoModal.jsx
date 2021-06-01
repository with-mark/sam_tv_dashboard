import { Modal, Spin } from 'antd'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'

const SermonVideoModal = ({visible,sermon,onclose}) => {
    const [state,setState] = useState({
        bufferring:true
    })
    return (
        <Modal  onCancel = {onclose} visible = {visible} footer = {null}>
            <Spin spinning = {state.bufferring} tip = "Video Loading" >

          <ReactPlayer onReady = {()=>setState({...state,bufferring:false})} url = {sermon.videoLink}  />
          </Spin>
        </Modal >
    )
}

export default SermonVideoModal
