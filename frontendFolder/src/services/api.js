import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

const fetchActiveNotes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/active-notes`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching active notes:", error);
    throw error; // Re-lanzar el error para manejarlo en el componente que llame a esta función si es necesario
  }
};

const fetchArchivedNotes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/archived-notes`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching archived notes:", error);
    throw error;
  }
};

const createNote = async (noteData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-note`, noteData);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

const editNote = async (noteId, editedData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/edit-note/${noteId}`,
      editedData
    );
    return response.data;
  } catch (error) {
    console.error("Error editing note:", error);
    throw error;
  }
};

const deleteNote = async (noteId) => {
  try {
    await axios.delete(`${BASE_URL}/delete-note/${noteId}`);
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

const toggleArchiveNote = async (noteId, isArchived) => {
  try {
    const url = isArchived
      ? `${BASE_URL}/unarchive-note/${noteId}`
      : `${BASE_URL}/archive-note/${noteId}`;
    await axios.put(url, { archived: !isArchived });
  } catch (error) {
    console.error("Error toggling archive:", error);
    throw error;
  }
};

export {
  fetchActiveNotes,
  fetchArchivedNotes,
  createNote,
  editNote,
  deleteNote,
  toggleArchiveNote,
};
