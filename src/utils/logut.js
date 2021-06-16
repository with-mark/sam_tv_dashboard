import { deleteAuthToken, deleteUserInfo, setIsAuth } from "./local_storage"

const logout= (histroy)=>{
    deleteUserInfo()
    deleteAuthToken()
    setIsAuth(false)
    histroy.push("/login")
}

export default logout