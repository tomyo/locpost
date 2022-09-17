export const config = {
  localHostUrl: 'http://localhost:8765/gun',
  remoteHostUrl: 'https://gun-manhattan.herokuapp.com/gun',
  rootName: 'locpost',
  messagesChannelName: 'messages',
  messageSchema: {
    title: String,
    latitude: Number,
    longitude: Number,
    message: String,
    date: String, // ISO UTC
    nickname: String,
  }
}