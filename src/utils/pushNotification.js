import axios from "axios"
import { pushNotificationNoImagePath, pushNotificationPath, pushNotificationWithCustomImagePath } from "./networks/endpoints"



const config = {
    headers:{
        "Content-Type":"application/json"
    }
}


const pushNotification = (title,body,topic)=>{
     const data = {
        notification:{
        title,
        body
        },
        topic
            }
        axios.post(pushNotificationPath,data,config).catch(err=>{throw err.response})

}

export const pushNotificationCustomImage = (title,body,topic,imageUrl)=>{
    const data = {
        notification:{
            title,
            body,
        },
        topic,
        imageUrl
    }
    axios.post(pushNotificationWithCustomImagePath,data,config)
}

export const pushNotificationNoImage=(title,body,topic)=>{
         const data = {
        notification:{
        title,
        body
        },
        topic
            }
        axios.post(pushNotificationNoImagePath,data,config)
}
export default pushNotification