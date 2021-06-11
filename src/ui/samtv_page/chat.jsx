import { List } from 'antd'
import React from 'react'
import "./styles/chats.scss"
const getchats = () => {
    const mychats = []
    for (let i = 0; i < 40; i++) {
        mychats.push({
            message: "Hello you are awesomme great job u are so great &#128512;",
            avatar: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528",
            author: "Thomas sarpong"
        })
    }

    return mychats
}

const Chats = ({item}) => {
    const myChat = getchats()
    return (
        <div className= "text-light chatbox" >
            <div className="chat-messages">
         
            {
                myChat.map(chat=>
                    (
                    <div className="chat-item">
                        <small className = "text-bold" >{chat.author} </small>
                        <p className="text-start">{chat.message}</p>
                    </div>
                    ))
            }

            </div>
       </div>
    )
}

export default Chats
