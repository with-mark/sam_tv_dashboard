import { Modal} from 'antd'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import CustomSpinner from '../../utils/ui/customSpinner/CustomSpinner'

const SermonVideoModal = ({visible,sermon,onclose}) => {
    const [state,setState] = useState({
        bufferring:true
    })
    return (
        <Modal  onCancel = {onclose} visible = {visible} footer = {null}>
            <CustomSpinner spinning = {state.bufferring} tip = "Video Loading" >

          <ReactPlayer onReady = {()=>setState({...state,bufferring:false})} url = {sermon.videoLink}  />
            </CustomSpinner>
        </Modal >
    )
}

export default SermonVideoModal
