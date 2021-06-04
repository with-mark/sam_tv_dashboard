import { Avatar, Divider, Image, Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookReader, faChartLine, faClock, faDesktop, faPray, faRunning, faUser } from '@fortawesome/free-solid-svg-icons'
import "./styles/index.scss"
import { UserOutlined } from "@ant-design/icons"
import StatisticsPage from '../statistics_page'
import UsersPage from '../users_page'
import MotivationPage from '../motivation_page'
import PrayerRequestsPage from '../prayer_requests_page'
import SermonesPage from '../sermons_page'
import SamTvPage from '../samtv_page'
import { fetchMotivations } from '../../state_mamger/functions/motivations'
import { connect } from 'react-redux'
import { fetchStreamData } from '../../state_mamger/functions/liveStreams'
import { fetchPrayers } from '../../state_mamger/functions/prayerRequest'
import VideoPage from "../samtv_page/videoPage"
import { fetchSermons } from '../../state_mamger/functions/sermons'
import EventsPage from '../events_page'
import { fetchEvents } from '../../state_mamger/functions/events'
import MeetingRoom from '../samtv_page/meetingRoom'
import ConferencePage from '../samtv_page/ConferencePage'
const LandingPage = ({
    getMotivation,
    getStreamingData,
    fetchPrayerRequests,
    getSermons,
    getEvents
}) => {
    const [state,setState] = useState({
        menuCollapse:false
    })
    const collapseMenu = status=>{
        setState({
            ...state,
            menuCollapse:status
        })
    }
    useEffect(() => {
        getMotivation()
        getStreamingData()
        fetchPrayerRequests()
        getSermons()
        getEvents()
    }, [getMotivation,getStreamingData,fetchPrayerRequests,getSermons,getEvents])
    return (
        <Layout style = {{minHeight:'100vh'}} >
            <Layout.Sider theme = "light" zeroWidthTriggerStyle = {{color:"blue"}} breakpoint = "md"  style = {{backgroundColor:"#ffffff"}} collapsible collapsed = {state.menuCollapse}  onCollapse = {collapseMenu}>
                <div className="logo">
                    <Image  preview = {false} src={logo} alt="slider-logo" srcset="" />
                </div>
                <Divider/>
                <Menu theme = "light" style = {{padding:"2em"}} mode = "inline" defaultOpenKeys = {["1"]} >
                    
                        <Link to = "/" >
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faChartLine} />} key = "1" >
                            <span hidden = {state.menuCollapse} >Statistics</span>
                        </Menu.Item>
                        
                        </Link>
                        <Divider/>
                        <Link to = "/sam-tv" >
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faDesktop} />} key = "2" >
                           
                            <span hidden = {state.menuCollapse} > Sam tv</span>

                        </Menu.Item>
                        </Link>
                        <Divider/>
                        <Link to = "/events" >
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faClock} />} key = "2" >
                           
                            <span hidden = {state.menuCollapse} >Events</span>

                        </Menu.Item>
                        </Link>
                       
                        <Divider/>
                        <Link to = "/motivation" >
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faRunning} />} key = "3" >
                        <span hidden = {state.menuCollapse} > Motovations</span>
                        </Menu.Item>
                        </Link>
                        <Divider/>
                        <Link to = "/prayer-requests" >
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faPray} />} key = "3" >
                        <span hidden = {state.menuCollapse} > Prayers req... </span>

                            
                        </Menu.Item>
                        </Link>

                        <Divider/>
                        <Link to = "/sermons" >
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faBookReader} />} key = "3" >
                        <span hidden = {state.menuCollapse} > Sermons</span>

                            
                        </Menu.Item>
                        </Link>
                        <Divider/>
                        <Link to = "/users" >
                        <Menu.Item style = {{fontSize:"1.1rem"}}  icon = {<FontAwesomeIcon style = {{marginRight:"1em"}} icon = {faUser} />} key = "3" >
                        <span hidden = {state.menuCollapse} > Users</span>

                        </Menu.Item>
                        </Link>
                        <Divider/>
                        
                </Menu>
                
            </Layout.Sider>
            <Layout>
                <Layout.Header id = "header" style = {{backgroundColor:"#ffffff"}} >
                    <div className="left-side"/>
                    <div className="right-side">
                       
                        <small>sarpotbemail@gmail.com</small>
                        <div className = "mx-3"/>
                        <Avatar  icon = {<UserOutlined/>} size = "large" className = "mt-2" />
                    </div>
                </Layout.Header>
                <Layout.Content>
                    <Switch>
                    <Route path = "/users" component = {UsersPage}  />
                    <Route path = "/motivation" component = {MotivationPage}  />
                    <Route path = "/events" component = {EventsPage}  />

                    <Route component = {SamTvPage } path = {`/sam-tv/schedules`}  />
                    <Route path = "/sam-tv/live" component = { ConferencePage}  />
                    <Route path = "/sam-tv" component = { MeetingRoom}  />
                    <Route path = "/prayer-requests" component = {PrayerRequestsPage}  />
                    <Route path = "/sermons" component = {SermonesPage}  />

                        <Route path = "/" component = {StatisticsPage}  />

                    </Switch>
                </Layout.Content>
            </Layout>

            
        </Layout>
    )
}
const  mapDispatchToProps =(dispatch)=> {
    return{
        getMotivation:()=>dispatch(fetchMotivations()),
        getStreamingData:()=>dispatch(fetchStreamData()),
        fetchPrayerRequests:()=>dispatch(fetchPrayers()),
        getSermons:()=>dispatch(fetchSermons()),
        getEvents:()=>dispatch(fetchEvents())
    } ;
}
const mapStateToProps =(state) =>{
    return{

    } ;
}
export default connect(mapStateToProps,mapDispatchToProps)(LandingPage)
