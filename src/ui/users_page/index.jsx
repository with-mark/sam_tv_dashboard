import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import AddUserModal from './addUserModal'
import "./styles/index.scss"

const UsersPage = () => {
    const [state,setState] = useState({
        addUserModal:false
    })

    const openAddUserModal = ()=>{
        setState({
            ...state,
            addUserModal:true
        })
    }
    const closeAddUserModal = ()=>{
        setState({
            ...state,
            addUserModal:false
        })
    }
    return (
        <div className = "users-page container ">
            <AddUserModal OnCancel = {closeAddUserModal} visible = {state.addUserModal} />
            <Card id = "main-card" className = "mt-5" >
                <Row>
                    <Col xs = "4" >
                    <h6>Users</h6>
                    </Col>
                    <Col className = "text-right" >
                        <Tooltip title = "Add A User" >
                        <PlusCircleOutlined onClick = {openAddUserModal} style = {{fontSize:"1.2rem",color:"green"}}  />

                        </Tooltip>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default UsersPage
