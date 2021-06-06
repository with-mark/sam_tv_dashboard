import React, { useEffect, useRef, useState } from 'react'
import "./styles/conferencePage.scss"
import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import logo from "../../assets/images/logo.png"
import { Image, message, notification, Spin } from 'antd'
import { getVideoToken } from '../../utils/agoraFunctions';


const config = { mode: "rtc", codec: "vp8" }
const appId = "c40594061e1f4580aae3b2af1963d01e"
const token = getVideoToken()
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();




const ConferencePage = () => {
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();
    const [users, setUsers] = useState([])
    const mounted = useRef(false)
    const [start, setStart] = useState(false)

    useEffect(() => {
        if (mounted.current) {
            client.unpublish(tracks).then(res => {
                mounted.current = false
                client.unsubscribe(getVideoToken())
                client.leave()
                notification.info({ message: "Left page" })
                // client.renewToken()

            })
        } else {

            mounted.current = true
        }


    }, [])

    useEffect(() => {
        let init = async (name) => {
            console.log(name);
            client.on("user-published", async (user, mediaType) => {
                client.subscribe(user, mediaType)
                    .then(() => {
                        if (mediaType === "video") {
                            setUsers(prevUsers => [...prevUsers, users])
                        }
                        if (mediaType === "audio") {
                            user.audioTrack?.play()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })


            })
        }
        client.on("user-unpublished", (user, type) => {
            if (type === "video") {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            }
        });
        client.on("user-left", (user) => {
            console.log("leaving", user);
            setUsers((prevUsers) => {
                return prevUsers.filter((User) => User.uid !== user.uid);
            });

        });

        client.join(appId, "casa", token)
            .then(res => {
                if (tracks) client.publish(tracks).then(
                    res => {
                        setStart(true)
                        if (ready && tracks) {
                            console.log("init ready");
                            init("channelName");
                        }
                    }
                ).catch(err => {
                    console.log("asd", err);
                    notification.error({
                        message: String(err)
                    })
                })
            })
            .catch(err => {
                console.log(err);
                if (err.code === "INVALID_OPERATION") {
                    setStart(true)
                } else if (err.code === "OPERATION_ABORTED") {
                    message.error("Aboqrted")
                }
                notification.error({ message: "Hello error", description: String(err) })
            })
    }, [])

    console.log("tracks");
    return (
        <div className="confrence-room" >
            <h2 className="text-light">{ready}</h2>
            <div className="logo">
                <Image id="logo" preview={false} src={logo} />
            </div>
            <h3 className="text-light">
                Live Mode
            </h3>
            <div className="canvas">

                {tracks ? <AgoraVideoPlayer onProgress={(e) => { console.log(e); }} videoTrack={tracks[2]} style={{ height: '200px', width: '100%' }} /> : <Spin spinning={!ready && !start} />}
            </div>
        </div>
    )
}

export default ConferencePage
