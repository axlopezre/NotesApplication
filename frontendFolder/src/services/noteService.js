import { createNote, editNote, deleteNote, toggleArchiveNote } from "./api";

const fetchNotes = async (
  fetchActiveNotes,
  fetchArchivedNotes,
  setActiveNotes,
  setArchivedNotes
) => {
  try {
    const active = await fetchActiveNotes();
    const archived = await fetchArchivedNotes();
    setActiveNotes(active);
    setArchivedNotes(archived);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

const handleSaveNote = async (noteData, setActiveNotes, activeNotes) => {
  try {
    const response = await createNote(noteData);
    setActiveNotes([...activeNotes, response]);
  } catch (error) {
    console.error("Error saving note:", error);
  }
};

const handleEditNote = async (
  { editingNoteId, editedContent, editedTitle },
  setUpdatedNotes,
  activeNotes,
  setActiveNotes,
  updatedNotes
) => {
  try {
    const response = await editNote(editingNoteId, {
      title: editedTitle,
      content: editedContent,
    });
    setUpdatedNotes(
      activeNotes.map((note) => (note.id === editingNoteId ? response : note))
    );
    setActiveNotes(updatedNotes);
  } catch (error) {
    console.error("Error editing note:", error);
  }
};

const handleDeleteNote = async (
  noteId,
  activeNotes,
  archivedNotes,
  setActiveNotes,
  setArchivedNotes
) => {
  try {
    await deleteNote(noteId);
    setActiveNotes(activeNotes.filter((note) => note.id !== noteId));
    setArchivedNotes(archivedNotes.filter((note) => note.id !== noteId));
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

const handleArchiveToggle = async (
  noteId,
  isArchived,
  updatedNotes,
  setUpdatedNotes,
  archivedNotes,
  setArchivedNotes,
  activeNotes,
  setActiveNotes
) => {
  try {
    await toggleArchiveNote(noteId, isArchived);
    setUpdatedNotes(
      isArchived
        ? archivedNotes.filter((note) => note.id !== noteId)
        : activeNotes.filter((note) => note.id !== noteId)
    );
    setActiveNotes(
      isArchived
        ? [
            ...activeNotes,
            ...archivedNotes.filter((note) => note.id === noteId),
          ]
        : updatedNotes
    );
    setArchivedNotes(
      isArchived
        ? updatedNotes
        : [
            ...archivedNotes,
            ...activeNotes.filter((note) => note.id === noteId),
          ]
    );
  } catch (error) {
    console.error("Error toggling archive:", error);
  }
};

export {
  fetchNotes,
  handleSaveNote,
  handleEditNote,
  handleDeleteNote,
  handleArchiveToggle,
};
