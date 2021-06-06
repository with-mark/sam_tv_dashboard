import {RtcTokenBuilder,RtcRole} from "agora-access-token"


const agoraConfig = {
mode:"rtc", codec:"vp8"
};


const appID =  'c40594061e1f4580aae3b2af1963d01e';
const appCertificate = '3fc30bdae6174ab9be11d72f2ddb43a7';
const channelName = 'casa';
const uid = "0";
// const account = "2882341273";
const role = RtcRole.PUBLISHER;
 
const expirationTimeInSeconds = 3600*48
 
const currentTimestamp = Math.floor(Date.now() / 1000)
 
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
 



const getAgoraTOken =()=> RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
export {getAgoraTOken, agoraConfig,expirationTimeInSeconds } 