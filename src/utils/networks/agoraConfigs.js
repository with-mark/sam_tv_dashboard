// export const AGORA_APP_ID = "";
const AgoraRTC = require('agora-rtc-sdk');

AgoraRTC.getDevices(d=>{
    console.log(d.length);
})