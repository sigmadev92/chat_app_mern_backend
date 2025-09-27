import { Router } from "express";
import {
  getAllUnseenMssgsController,
  getSelectedUserMessages,
  markAsSeen,
  writeMessage,
} from "./message.controllers.js";

const messageRouter = Router();

messageRouter.get("/unseen", getAllUnseenMssgsController);
messageRouter.get("/read/:selectedUserId", getSelectedUserMessages);
messageRouter.post("/write", writeMessage);
messageRouter.put("/mark-seen/:senderId", markAsSeen);

export default messageRouter;
