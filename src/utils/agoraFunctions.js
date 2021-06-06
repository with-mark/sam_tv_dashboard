import { getLocalAgoraToken, setAgoraToken } from "./local_storage"
import { getAgoraTOken } from "./networks/agoraConfigs"

export const getVideoToken =()=>{
    let token = getLocalAgoraToken()
    console.log(token);
    if(!token){
        token =  getAgoraTOken()

    }
    setAgoraToken(token)
    return token
}