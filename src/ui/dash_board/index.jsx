import { Avatar,  Image, Layout, Menu, Popover, Button, Popconfirm, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBookReader, faChartLine, faClock, faDesktop, faPray, faRunning, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import "./styles/index.scss"
import { CloseOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons"
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
import { fetchSermons } from '../../state_mamger/functions/sermons'
import EventsPage from '../events_page'
import { fetchEvents } from '../../state_mamger/functions/events'
import MeetingRoom from '../samtv_page/meetingRoom'
import { fetchUsers } from '../../state_mamger/functions/users'
import { fetchUserInfo } from '../../state_mamger/functions/userInfo'
import logut from '../../utils/logut'
import TestimimoniesPage from '../testimimoniesPage'
import { fetchTestimony } from '../../state_mamger/functions/testimonies'
const LandingPage = ({
    getMotivation,
    getStreamingData,
    fetchPrayerRequests,
    getSermons,
    getEvents,
    getUsers,
    userInfo,
    getUserInfo,
    getTestimonies
}) => {
    const [state, setState] = useState({
        menuCollapse: false,
        hideMenu: false
    })
    const toggleMenu = () => {
        setState({
            ...state,
            hideMenu: !state.hideMenu
        })
    }
    const collapseMenu = status => {
        setState({
            ...state,
            menuCollapse: status
        })
    }
    useEffect(() => {
        getMotivation()
        getStreamingData()
        fetchPrayerRequests()
        getSermons()
        getUsers()
        getEvents()
        getUserInfo()
        getTestimonies()
    }, [getMotivation, getTestimonies, getUserInfo, getStreamingData, fetchPrayerRequests, getSermons, getEvents, getUsers])


    const history = useHistory()

    const popOverContent = (
        <div className="p-2 popOverContent" >
            <p>{userInfo.email}</p>
            <div className="logout-btn">
                <Popconfirm
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{ id: "confirmBtn" }}
                    cancelButtonProps={{ style: { color: "#fff", backgroundColor: "red" } }}
                    icon={<LogoutOutlined />}
                    onConfirm={() => {
                        logut(history)
                    }}
                    title="Are you sure u want to logout?" >
                    <Button icon={<FontAwesomeIcon className="mx-2" icon={faSignOutAlt} />} id="logoutBtn" shape="round" >Logout</Button>

                </Popconfirm>
            </div>

        </div>
    );
    const onNavigate = (e) => history.push(e.item.props.path)

    return (
        <Layout style={{ minHeight: '100vh' }} >
            <Layout.Sider hidden={state.hideMenu} theme="light" zeroWidthTriggerStyle={{ color: "blue" }} breakpoint="md" style={{ backgroundColor: "#ffffff" }} collapsible collapsed={state.menuCollapse} onCollapse={collapseMenu}>
                <div className="logo">
                    <Image preview={false} src={logo} alt="slider-logo" srcset="" />
                </div>
                <hr />
                <Menu   style={{ color: "royalblue" }} onClick={onNavigate} theme="light" mode="vertical" defaultOpenKeys={["1"]} >
                    <Menu.Item title= "Statistics" path="/" icon={<FontAwesomeIcon style={{ marginRight: "1em" }} icon={faChartLine} />} key="1" >
                        <span hidden={state.menuCollapse} >Statistics</span>
                    </Menu.Item>

                    <hr />

                    <Menu.SubMenu key="sub1" icon={<FontAwesomeIcon style={{ marginRight: "1em" }} icon={faDesktop} />} style={{ height: "56px", padding: "0" }} title={!state.menuCollapse && "SamTv"}>

                        <Menu.Item title="Sam tv" path="/sam-tv" key="2" >

                            <span > Sam tv</span>

                        </Menu.Item>
                        <Menu.Item title="Schedules" path="/sam-tv/schedules" key="3" >

                            <span  > Schedules</span>

                        </Menu.Item>
                    </Menu.SubMenu>

                    <hr />
                    <Menu.Item title="Events" path="/events" icon={<FontAwesomeIcon style={{ marginRight: "1em" }} icon={faClock} />} key="4" >

                        <span hidden={state.menuCollapse} >Events</span>

                    </Menu.Item>

                    <hr />
                    <Menu.Item title="Testimonies" path="/testimonies" icon={<FontAwesomeIcon style={{ marginRight: "1em" }} icon={faBell} />} key="5" >

                        <span hidden={state.menuCollapse} >Testimonies</span>

                    </Menu.Item>

                    <hr />
                    <Menu.Item title="Motovations" path="/motivations" icon={<FontAwesomeIcon style={{ marginRight: "1em" }} icon={faRunning} />} key="6" >
                        <span hidden={state.menuCollapse} > Motovations</span>
                    </Menu.Item>
                    <hr />
                    <Menu.Item title="Prayers request"  path="/prayer-requests" icon={<FontAwesomeIcon style={{ marginRight: "1em" }} icon={faPray} />} key="7" >
                        <span hidden={state.menuCollapse} > Prayers request </span>


                    </Menu.Item>

                    <hr />
                    <Menu.Item title="Sermons" path="/sermons" icon={<FontAwesomeIcon style={{ marginRight: "1em" }} icon={faBookReader} />} key="8" >
                        <span hidden={state.menuCollapse} > Sermons</span>


                    </Menu.Item>
                    <hr />
                    <Menu.Item title="Users" path="/users" icon={<FontAwesomeIcon style={{ marginRight: "1em" }} icon={faUser} />} key="9" >
                        <span hidden={state.menuCollapse} > Users</span>

                    </Menu.Item>
                    <hr />

                </Menu>

            </Layout.Sider>
            <Layout>
                <Layout.Header id="header" style={{ backgroundColor: "#ffffff" }} >
                    <div style={{ zIndex: "100000" }} className="left-side">
                        {
                            state.hideMenu ? <Tooltip title="Open menu" ><MenuOutlined onClick={toggleMenu} className="text-start" style={{ fontSize: "1.3rem" }} /></Tooltip>
                                : <Tooltip title="Close menu" ><CloseOutlined onClick={toggleMenu} className="text-start" style={{ fontSize: "1.3rem" }} /></Tooltip>
                        }



                    </div>
                    <div className="right-side">

                        <small>{userInfo.email}</small>
                        <div className="mx-3" />
                        <Popover trigger="click" content={popOverContent} placement="bottomLeft" >
                            <Avatar icon={<UserOutlined />} size="large" className="mt-2" />

                        </Popover>
                    </div>
                </Layout.Header>
                <Layout.Content >
                    <Switch>
                        <Route path="/users" component={UsersPage} />
                        <Route path="/motivations" component={MotivationPage} />
                        <Route path="/events" component={EventsPage} />
                        <Route path="/testimonies" component={TestimimoniesPage} />
                        <Route component={SamTvPage} path={`/sam-tv/schedules`} />
                        <Route path="/sam-tv" component={MeetingRoom} />
                        <Route path="/prayer-requests" component={PrayerRequestsPage} />
                        <Route path="/sermons" component={SermonesPage} />

                        <Route path="/" component={StatisticsPage} />

                    </Switch>
                </Layout.Content>
            </Layout>


        </Layout>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMotivation: () => dispatch(fetchMotivations()),
        getStreamingData: () => dispatch(fetchStreamData()),
        fetchPrayerRequests: () => dispatch(fetchPrayers()),
        getSermons: () => dispatch(fetchSermons()),
        getEvents: () => dispatch(fetchEvents()),
        getUsers: () => dispatch(fetchUsers()),
        getUserInfo: () => dispatch(fetchUserInfo()),
        getTestimonies: () => dispatch(fetchTestimony())
    };
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
