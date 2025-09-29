import {
  getAllNotesRepo,
  createNewNoteRepo,
  updateNewNoteRepo,
  deleteNoteRepo,
} from "./notes.repository.js";
import CustomError from "../../middlewares/errorHandler.js";

const getAllNotes_C = async (req, res, next) => {
  try {
    const { _id } = req.USER;
    const notes = await getAllNotesRepo(_id);
    return res.status(200).send({ success: true, notes });
  } catch (error) {
    next(new CustomError(503, error.message));
  }
};
const createNewNote_C = async (req, res, next) => {
  try {
    const { _id } = req.USER;
    const { text, description } = req.body;
    const result = await createNewNoteRepo({ text, description, userId: _id });
    return res.status(result.code).json(result.response);
  } catch (error) {
    next(new CustomError(503, error.message));
  }
};

const updateNote_C = async (req, res, next) => {
  try {
    const userId = req.USER._id;
    const { noteId } = req.params;
    const { text, description } = req.body;
    const response = await updateNewNoteRepo({
      text,
      description,
      noteId,
      userId,
    });
    console.log(response);
  } catch (error) {
    return next(new CustomError(503, error.message));
  }
};

const deleteNote_C = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.USER._id;
    const response = await deleteNoteRepo({ noteId, userId });
    console.log(response);
  } catch (error) {
    return next(new CustomError(503, error.message));
  }
};

export { getAllNotes_C, createNewNote_C, updateNote_C, deleteNote_C };
