let ioInstance;
// store for online Users

const usersSocketMap = {};


export const setScoketInstance = (io) => {
  ioInstance = io;
};

export const getScoketInstance = () => ioInstance;

export function getReceiverScoketId(userId) {
  return usersSocketMap[userId];
}



export default function socketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) usersSocketMap[userId] = socket.id;

    // emit events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(usersSocketMap));

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      delete usersSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(usersSocketMap));
    });
  });
}
console.log("Current Online Users:", usersSocketMap);