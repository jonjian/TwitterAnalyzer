// to change between new sockets on new connections and for access at other components

export default function setSocket(socket) {
  return {
    type: 'NEW_SOCKET',
    payload: socket,
  };
}
