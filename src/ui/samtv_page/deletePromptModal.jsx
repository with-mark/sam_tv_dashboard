import { Button, Form, Input, Modal } from 'antd'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { deletePrayer } from '../../state_mamger/functions/prayerRequest'

const StreamDeletePromptModal = ({visible,onClose,prayer,deletePrayer}) => {
    return (
        <Modal onCancel = {onClose} visible = {visible} footer = {null} >
            <h6 className="text-center">Deletion prompt</h6>
            <p><span style = {{color:"red"}} > Note: </span> This action will permanently delete {prayer.author}'s the this prayer request from the data base. This action cannot be undone. <br /> Fill the form field below with <b><i>delete</i> </b> to confirm deletion. </p>
            <Form
            onFinish = {()=>{
                onClose()
                deletePrayer(prayer)
            }}
            >
                <Row>
                    <Col xs = "8" >
                    <Form.Item name = "delete" 
                    rules = {[
                        {
                            required:true,
                            message:"The field cannot be empty"
                        },
                        {
                            validator: (rule,value,callback)=>{
                                if(value === "delete"){
                                    callback()

                                }else{
                                    callback(('Input is not corrent'))

                                }
                            }
                        },
                       
                        
                    ]}
                    >
                    <Input style = {{borderRadius: "10px" }} placeholder = "delete" />
                </Form.Item>
                    </Col>
                    <Col>
                        <Button htmlType = "submit" style = {{borderColor:"red",color:"red"}} shape = "round" >Confirm delete</Button>
                    </Col>
                </Row>
              
            </Form>
        </Modal>
    )
}

const mapStateToProps =(state) =>{
    return{
    } ;
}

const mapDispatchToProps = dispatch=>{
    return {
        deletePrayer:prayer=>dispatch(deletePrayer(prayer))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(StreamDeletePromptModal)
