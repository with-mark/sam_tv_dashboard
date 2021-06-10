import React from 'react'
import { Card,Avatar } from "antd"

const Chat = ({item}) => {
    return (
       <Card>
           <Card.Meta  description = {item.text} avatar = {<Avatar src = {item.avatar} 
           
           />} 

           />
       </Card>
    )
}

export default Chat
