
export const localHost = "http://127.0.0.1:5000/"
export const samTvHeroku ="https://sam-tv-staging.herokuapp.com/"
const baseUrl = samTvHeroku
export const pushNotificationPath = `${baseUrl}pushNotification/push`
export const pushNotificationWithCustomImagePath = `${baseUrl}pushNotification/push_image`
export const pushNotificationNoImagePath = `${baseUrl}pushNotification/push_no_image`
export const deleteUserPath = id=>`${baseUrl}manageUsers/deleteUser/${id}`
export const startStreamRecordingPath = `${baseUrl}live-stream-recoroding/record`
export const stopStreamRecordingPath = `${baseUrl}live-stream-recoroding/stop`