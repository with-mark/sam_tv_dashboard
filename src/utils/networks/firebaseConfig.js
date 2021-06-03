import { notification } from 'antd';
import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyBFvR9IeuODrqBWb_GmeeJve2I195wsXIc",
  authDomain: "samtv-6a1be.firebaseapp.com",
  projectId: "samtv-6a1be",
  storageBucket: "samtv-6a1be.appspot.com",
  messagingSenderId: "834096806219",
  appId: "1:834096806219:web:5f74ed1c7c8cc84b2650ce",
  measurementId: "G-CLT65CEMR6"
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
