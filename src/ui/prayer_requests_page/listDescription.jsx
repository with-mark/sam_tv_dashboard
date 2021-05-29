import { Tag } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { getDateInWords } from '../../utils/dateTimeConvert'

const ListDescription = ({item}) => {
    return (
        <div>
           
            <Row>
                <Col xs = "6" sm = "6" lg = "3" > <small> <b>Author: </b> {item.author}</small></Col>
                <Col xs = "6" sm = "6" lg = "3" > <small> <b>Posted at: </b> {getDateInWords(item.date)} </small> </Col>
            </Row>
            <p> {item.description.slice(0,200)} <span>{item.description.length > 200 && "..."} </span> </p>
                {item.is_read? <Tag color  = "green" >Read</Tag>:<Tag color  = "red" >Not read</Tag>} 
                {item.done? <Tag  color  = "green" >Prayed for</Tag>:<Tag color  = "red" >Not prayed for</Tag>} 

               
        </div>
    )
}

export default ListDescription