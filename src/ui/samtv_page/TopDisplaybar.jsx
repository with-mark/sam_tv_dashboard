import { VideoCameraOutlined } from '@ant-design/icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge } from 'antd'
import React from 'react'
import { connect } from 'react-redux'

const TopDisplaybar = ({ chatsInfo}) => {
    console.log(chatsInfo);
    return (
        <div className= "d-flex " >
            <div className="recording d-flex">
                <p>Recording ...</p>
                <VideoCameraOutlined/>
            </div>

            <div className="live  mr-5  ml-auto ">
               
                    <div className="d-flex w-100 p-1">
                        <p className="text-light text-bold" > live</p>
                        <div className = "mx-2 pb-1 " style = {{fontSize:"1.2rem"}} > <FontAwesomeIcon icon = {faEye} /> </div>
                    <Badge showZero className="ml-auto mr-2" count={chatsInfo.audience.length} />
                    </div>
                  

            </div>
            
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        chatsInfo: state.samTvChats
    }
}

export default connect(mapStateToProps)(TopDisplaybar)
