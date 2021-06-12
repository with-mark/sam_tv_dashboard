import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Tooltip, Table } from 'antd'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import AddUserModal from './addUserModal'
import "./styles/index.scss"

const column = [{
    title: "Name",
    dataIndex: "name",
    ellipsis: true,
    key: "name"
},
    {
        title: "Email",
        dataIndex: "email",
        ellipsis: true,
        key: "email"
    },
    {
        title:"Action",
        key:"action",
        render:()=>{

        }
    }


]

const UsersPage = ({ usersInfo }) => {
    const [state, setState] = useState({
        addUserModal: false
    })

    const openAddUserModal = () => {
        setState({
            ...state,
            addUserModal: true
        })
    }
    const closeAddUserModal = () => {
        setState({
            ...state,
            addUserModal: false
        })
    }

    return (
        <div className="users-page container ">
            <AddUserModal onClose={closeAddUserModal} visible={state.addUserModal} />
            <Card id="main-card" className="mt-5" >
                <Row>
                    <Col xs="4" >
                        <h6>Users</h6>
                    </Col>
                    <Col className="text-right" >
                        <Tooltip title="Add A User" >
                            <PlusCircleOutlined onClick={openAddUserModal} style={{ fontSize: "1.2rem", color: "green" }} />

                        </Tooltip>
                    </Col>
                </Row>

                <Table id = "table" loading = {usersInfo.loading} columns={column} dataSource={usersInfo.data} />
            </Card>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        usersInfo: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)
