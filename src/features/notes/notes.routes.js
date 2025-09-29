import { Router } from "express";
import {
  createNewNote_C,
  deleteNote_C,
  getAllNotes_C,
  updateNote_C,
} from "./notes.controller";

const notesRouter = Router();

notesRouter.get("/", getAllNotes_C);
notesRouter.post("/", createNewNote_C);
notesRouter.put("/:noteId", updateNote_C);
notesRouter.delete("/:noteId", deleteNote_C);
export default notesRouter;
