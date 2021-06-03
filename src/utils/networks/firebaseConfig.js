import { notification } from 'antd';
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDYpBkB0nj2QAXdkvQQ5lXytn1XOBtk_3U",
    authDomain: "sam-tv-ebd2b.firebaseapp.com",
    projectId: "sam-tv-ebd2b",
    storageBucket: "sam-tv-ebd2b.appspot.com",
    messagingSenderId: "300037909449",
    appId: "1:300037909449:web:91e9afd2d7330471911618",
    measurementId: "G-L38Q39G37D"
  };




firebase.initializeApp(firebaseConfig)
export const auth  = firebase.auth()
const db = firebase.firestore()
db.settings({timestampsInSnapShots:true})
const storage = firebase.storage()

const messaging = firebase.messaging()
Notification.requestPermission().then(res=>{
  messaging.getToken()
  .then(token=>{console.log(token);}).catch(err=>console.log(err))
}).catch(err=>{
  console.log(err);
})

messaging.onMessage(payload=>{
  console.log(payload);
  notification.info({
    message: payload.data.title,
    description:payload.data.body,
  })
})


export {db,storage}
export default firebase
