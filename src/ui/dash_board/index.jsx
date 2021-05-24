import { Avatar, Divider, Image, Layout, Menu } from 'antd'
import React, { useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookReader, faChartLine, faDesktop, faPray, faRunning, faUser } from '@fortawesome/free-solid-svg-icons'
import "./styles/index.scss"
import { UserOutlined } from "@ant-design/icons"
const LandingPage = () => {
    const [state,setState] = useState({
        menuCollapse:false
    })
    const collapseMenu = status=>{
        setState({
            ...state,
            menuCollapse:status
        })
    }
    return (
        <Layout style = {{minHeight:'100vh'}} >
            <Layout.Sider theme = "light" zeroWidthTriggerStyle = {{color:"blue"}} breakpoint = "md"  style = {{backgroundColor:"#ffffff"}} collapsible collapsed = {state.menuCollapse}  onCollapse = {collapseMenu}>
                <div className="logo">
                    <Image preview = {false} src={logo} alt="slider-logo" srcset="" />
                </div>
                <Divider/>
                <Menu theme = "light" style = {{padding:"2em"}} mode = "inline" defaultOpenKeys = {["1"]} >
                    
                        <Link>
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faChartLine} />} key = "1" >
                            <span hidden = {state.menuCollapse} >Statistics</span>
                        </Menu.Item>
                        
                        </Link>
                        <Divider/>
                        <Link>
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faDesktop} />} key = "2" >
                           
                            <span hidden = {state.menuCollapse} > Sam tv</span>

                        </Menu.Item>
                        </Link>
                       
                        <Divider/>
                        <Link>
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faRunning} />} key = "3" >
                        <span hidden = {state.menuCollapse} > Motovations</span>

                            
                        </Menu.Item>
                        </Link>
                        <Divider/>
                        <Link>
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faPray} />} key = "3" >
                        <span hidden = {state.menuCollapse} > Prayers</span>

                            
                        </Menu.Item>
                        </Link>

                        <Divider/>
                        <Link>
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faBookReader} />} key = "3" >
                        <span hidden = {state.menuCollapse} > Sermones</span>

                            
                        </Menu.Item>
                        </Link>
                        <Divider/>
                        <Link>
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faUser} />} key = "3" >
                        <span hidden = {state.menuCollapse} > Users</span>

                        </Menu.Item>
                        </Link>
                        <Divider/>
                        
                </Menu>
                
            </Layout.Sider>
            <Layout>
                <Layout.Header id = "header" style = {{backgroundColor:"#ffffff"}} >
                    <div className="right-side"/>
                    <div className="right-side">
                       
                        <small>sarpotbemail@gmail.com</small>
                        <div className = "mx-3"/>
                        <Avatar  icon = {<UserOutlined/>} size = "large" className = "mt-2" />
                    </div>
                </Layout.Header>
                <Layout.Content>
                    <Switch>
                        <Route path = ""  />

                    </Switch>
                </Layout.Content>
            </Layout>

            
        </Layout>
    )
}

export default LandingPage
