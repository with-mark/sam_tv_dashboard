import { getUserInfo } from "./local_storage"

export const adminOnly=()=>{
    return new Promise((resolve,reject)=>{
        const user = getUserInfo()
        if(user === null){
            return reject(false)
        }
        if(user.role !== 'admin'){
            return reject(false)
        }
       return resolve(true)
    })
}


export const readWriteOnly=()=>{
    return new Promise((resolve,reject)=>{
    const user = getUserInfo()
    console.log(user.role !== 'admin' || user.role !== 'read_write' );
        if(user === null){
            return reject(false)
        }
        if(user.role !== 'admin' || user.role !== 'read_write' ){
            
            return resolve(true)
        }
        return reject(false)
    })
}