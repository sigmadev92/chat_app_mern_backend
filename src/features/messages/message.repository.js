import Users from "../users/user.model.js";
import Messages from "./message.model.js";

//get all the unseen messages for a loggedin user

const getAllUnseenMessages = async (userId) => {
  try {
    const filteredUsers = await Users.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    //
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await Messages.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = {
          sender: user,
          messages,
        };
      }
    });
    await Promise.all(promises);
    return {
      code: 200,
      response: {
        success: true,
        unseenMessages,
      },
    };
  } catch (error) {
    return {
      code: 503,
      response: {
        success: false,
        msg: error.message,
      },
    };
  }
};

const getSelectedUserMessagesRepo = async (selectedUserId, myId) => {
  try {
    const messages = await Messages.find({
      $or: [
        { senderId: selectedUserId, receiverId: myId },
        { receiverId: selectedUserId, senderId: myId },
      ],
    });
    await Messages.updateMany(
      { senderId: selectedUserId, receiverId: myId, seen: false },
      { $set: { seen: true } }
    );

    return {
      code: 200,
      response: {
        success: true,
        messages,
      },
    };
  } catch (error) {
    return {
      code: 503,
      response: {
        success: false,
        msg: error.message,
      },
    };
  }
};

const markAsSeenRepo = async ({ senderId, receiverId }) => {
  try {
    await Messages.updateMany(
      { senderId, receiverId, seen: false },
      { $set: { seen: true } }
    );
    return {
      code: 200,
      response: {
        success: true,
      },
    };
  } catch (err) {
    return {
      code: 503,
      response: {
        success: false,
        message: err.message,
      },
    };
  }
};
const writeMessageRepo = async ({ receiverId, myId, text }) => {
  try {
    const newMssg = await Messages.insertOne({
      receiverId,
      text,
      senderId: myId,
    });
    return {
      code: 201,
      response: {
        success: true,
        newMssg,
      },
    };
  } catch (error) {
    return {
      code: 503,
      response: {
        success: false,
        msg: error.message,
      },
    };
  }
};
export {
  getAllUnseenMessages,
  getSelectedUserMessagesRepo,
  writeMessageRepo,
  markAsSeenRepo,
};
