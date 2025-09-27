import {
  getAllUnseenMessages,
  getSelectedUserMessagesRepo,
  markAsSeenRepo,
  writeMessageRepo,
} from "./message.repository.js";
import { onlineUsers } from "../../config/socket.js";
import CustomError from "../../middlewares/errorHandler.js";
const getAllUnseenMssgsController = async (req, res, next) => {
  const { _id } = req.USER;
  const result = await getAllUnseenMessages(_id);

  return res.status(result.code).json(result.response);
};

const getSelectedUserMessages = async (req, res, next) => {
  const { selectedUserId } = req.params;
  const { _id } = req.USER;
  console.log(" on reading a single chat", _id, " ", selectedUserId);
  const result = await getSelectedUserMessagesRepo(selectedUserId, _id);
  return res.status(result.code).json(result.response);
};

const markAsSeen = async (req, res, next) => {
  const { senderId } = req.params;
  const receiverId = req.USER._id;
  const result = await markAsSeenRepo({ senderId, receiverId });
  return res.status(result.code).json(result.response);
};
const writeMessage = async (req, res, next) => {
  console.log(req.body);
  const { receiverId, text } = req.body;

  const myId = req.USER._id;
  try {
    const result = await writeMessageRepo({ receiverId, myId, text });
    if (result.code === 201) {
      // Access io instance
      const io = req.app.get("io");
      const receiverSocketId = onlineUsers[receiverId];
      // if the receiver is online - send a real time message too.
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", {
          sender: req.USER,
          message: result.response.newMssg,
        });
      }
    }
    return res.status(result.code).json(result.response);
  } catch (error) {
    next(new CustomError(503, error.message));
  }
};

export {
  getAllUnseenMssgsController,
  getSelectedUserMessages,
  writeMessage,
  markAsSeen,
};
