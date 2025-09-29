import Notes from "./notes.model.js";

const getAllNotesRepo = async (userId) => {
  return await Notes.find({ userId });
};

const createNewNoteRepo = async ({ text, description, userId }) => {
  try {
    const newNote = await Notes({ text, description, userId });
    await newNote.save();
    return {
      code: 201,
      response: {
        success: true,
        newNote,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      response: {
        success: false,
        error,
      },
    };
  }
};

const updateNewNoteRepo = async ({ text, description, noteId, userId }) => {
  try {
    const response = await Notes.updateOne(
      { _id: noteId, userId },
      { $set: { text, description } }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      response: {
        success: false,
        error,
      },
    };
  }
};

const deleteNoteRepo = async ({ noteId, userId }) => {
  try {
    return await Notes.deleteOne({ _id: noteId, userId });
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      response: {
        success: false,
        error,
      },
    };
  }
};

export {
  getAllNotesRepo,
  createNewNoteRepo,
  updateNewNoteRepo,
  deleteNoteRepo,
};
