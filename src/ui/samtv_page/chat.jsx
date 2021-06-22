import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchChats } from '../../state_mamger/functions/samTvChats'
import "./styles/chats.scss"




const Chats = ({ chatsInfo, getChats }) => {
    useEffect(() => {
        getChats()


    }, [getChats])
    // const myChat = getchats()
    return (
        <div className="text-light chatbox" >
            <div className="chat-messages">
                {chatsInfo.data.length > 0 &&
                    chatsInfo.data.map(chat =>
                    (
                        <div className="chat-item">
                            <small className="text-bold" >{chat.userName} </small>
                            <p className="text-start">{chat.comment}</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        chatsInfo: state.samTvChats
    }

}
const mapDispatchToProps = dispatch => {
    return {
        getChats: () => dispatch(fetchChats()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats)
