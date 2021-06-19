export const samTvHeroku ="http://localhost:5000/"
export const pushNotificationPath = `${samTvHeroku}pushNotification/push`
export const pushNotificationWithCustomImagePath = `${samTvHeroku}pushNotification/push_image`
export const pushNotificationNoImagePath = `${samTvHeroku}pushNotification/push_no_image`
export const deleteUserPath = id=>`${samTvHeroku}manageUsers/deleteUser/${id}`
export const startStreamRecordingPath = `${samTvHeroku}live-stream-recoroding/record`
export const stopStreamRecordingPath = `${samTvHeroku}live-stream-recoroding/stop`