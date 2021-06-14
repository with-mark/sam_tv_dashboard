import axios from "axios"



const pushNotification = (title,body,topic)=>{
     const data = {
        notification:{
        title,
        body
        },
        topic
            }
    
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

        axios.post(pushNotificationPath,data,config)

}

export default pushNotification