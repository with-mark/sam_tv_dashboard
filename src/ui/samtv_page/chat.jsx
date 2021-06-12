import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchChats } from '../../state_mamger/functions/samTvChats'
import "./styles/chats.scss"
// const getchats = () => {
//     const mychats = []
//     for (let i = 0; i < 40; i++) {
//         mychats.push({
//             message: "Hello you are awesomme great job u are so great &#128512;",
//             avatar: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528",
//             author: "Thomas sarpong"
//         })
//     }

//     return mychats
// }



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
        getChats: () => dispatch(fetchChats())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats)
