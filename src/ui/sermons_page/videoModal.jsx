import { Modal } from 'antd'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'


const SermonVideoModal = ({visible,sermon,onclose}) => {
    const [state,setState] = useState({
        bufferring:false
    })
    return (
        <Modal style = {{padding:"0px"}} onCancel = {onclose} visible = {visible} footer = {null}>
          <ReactPlayer onBuffer = {()=>setState({...state,bufferring:true})}  url = {sermon.videoLink}  />
       
        </Modal >
    )
}

export default SermonVideoModal
