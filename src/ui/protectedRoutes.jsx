import React from 'react'
import { Redirect, Route } from 'react-router'
import { getIsAuth } from '../utils/local_storage'

const ProtectedRoutes = ({component:Component,...rest}) => {
    if(!getIsAuth()){
        return <Redirect to = "/login"/>
    }
    return <Route {...rest} render = {props=><Component {...props} {...rest} />}/> 
}

export default ProtectedRoutes
