export const config = {
  localHostUrl: 'http://localhost:8765/gun',
  remoteHostUrl: 'https://gun-manhattan.herokuapp.com/gun',
  rootName: 'locpost',
  searchKeyPrefix: 'messages-',
  messageSchema: {
    context: String,
    message: String,
    date: String, // ISO UTC
    //...
  }
}

// { 'locpost': { 'messages-52.49,52.49': [...], 'messages-chat-with-rene': [...] } }