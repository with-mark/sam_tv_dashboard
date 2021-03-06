import { getLocalAgoraToken, setAgoraToken } from "./local_storage"
import { getAgoraTOken } from "./networks/agoraConfigs"
import { db } from "./networks/firebaseConfig"

export const getVideoToken =()=>{
    let token = getLocalAgoraToken()
    return new Promise((resolve,reject)=>{
            if(!token){
        token =  getAgoraTOken()
         setAgoraToken(token)
           db.collection("samTv").doc("agoraToken").update({
                        token,
                        live:true
            }).then(()=>{
              return  resolve(token)
            }).catch(err=>{
                return reject(err)
            })

    }else{
    setAgoraToken(token)
    return resolve(token)

    }

    })
   
}


