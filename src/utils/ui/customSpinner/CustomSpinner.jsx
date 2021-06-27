import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'
import "./style/index.scss"

const CustomSpinner = ({spinning,children,...rest}) => {
    return (
        <Spin {...rest} indicator = {<LoadingOutlined id = "loader" />} className = "spinner" spinning={spinning}>

            {children}
        </Spin>
    )
}

export default CustomSpinner
