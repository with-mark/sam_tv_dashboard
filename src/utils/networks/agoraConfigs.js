
const agoraConfig = {
mode:"rtc", codec:"vp8"
};



const {RtcTokenBuilder,RtcRole} = require('agora-access-token')
const appID =  '3fc30bdae6174ab9be11d72f2ddb43a7';
const appCertificate = '3fc30bdae6174ab9be11d72f2ddb43a7';
const channelName = 'sam';
// const uid = 2882341273;
const account = "2882341273";
const role = RtcRole.PUBLISHER;
 
const expirationTimeInSeconds = 3600
 
const currentTimestamp = Math.floor(Date.now() / 1000)
 
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
 


const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, account, role, privilegeExpiredTs);
export {tokenA, agoraConfig } 