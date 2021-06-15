import { Image } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { getDateInWords } from '../../utils/dateTimeConvert'

const MotivationDescription = ({item}) => {
    return item.type === "text"? (
        <div>
           
            <Row>
                <Col xs = "6" sm = "6" lg = "3" > <small> <b>Author: </b> {!item.author?"Not specified":item.author}</small></Col>
                <Col xs = "6" sm = "6" lg = "3" > <small> <b>Posted at: </b> {getDateInWords(item.timestamp.toDate())} </small> </Col>

            </Row>
            <p> {item.description}  </p>

               
        </div>
    ):(
        <div>
           
            <Row>
                <Col xs = "6" sm = "6" lg = "3" > <small> <b>Author: </b> {!item.author?"Not specified":item.author}</small></Col>
                <Col xs = "6" sm = "6" lg = "3" > <small> <b>Posted at: </b> {getDateInWords(item.timestamp.toDate())} </small> </Col>

            </Row>
            <Image src = {item.image} />

               
        </div>
    )
}

export default MotivationDescription
