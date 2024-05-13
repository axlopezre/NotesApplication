import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteList from "./Components/NoteList/NoteList.jsx";
import NoteForm from "./Components/NoteForm/NoteForm.jsx";
import { fetchActiveNotes, fetchArchivedNotes } from "./services/api";

import {
  handleSaveNote,
  handleEditNote,
  handleDeleteNote,
  handleArchiveToggle,
} from "./services/noteService.js";
import "./App.css";
import { fetchNotes } from "./services/noteService.js";

export const App = () => {
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [updatedNotes, setUpdatedNotes] = useState([]);

  useEffect(() => {
    fetchNotes(
      fetchActiveNotes,
      fetchArchivedNotes,
      setActiveNotes,
      setArchivedNotes
    );
  }, [updatedNotes]);

  const handleSaveNoteWrapper = (noteData) => {
    handleSaveNote(noteData, setActiveNotes, activeNotes);
  };

  const handleEditNoteWrapper = ({
    editingNoteId,
    editedContent,
    editedTitle,
  }) => {
    handleEditNote(
      {
        editingNoteId,
        editedContent,
        editedTitle,
      },
      setUpdatedNotes,
      activeNotes,
      setActiveNotes,
      updatedNotes
    );
  };

  const handleDeleteNoteWrapper = async (noteId) => {
    handleDeleteNote(
      noteId,
      activeNotes,
      archivedNotes,
      setActiveNotes,
      setArchivedNotes
    );
  };

  const handleArchiveToggleWrapper = async (noteId, isArchived) => {
    handleArchiveToggle(
      noteId,
      isArchived,
      updatedNotes,
      setUpdatedNotes,
      archivedNotes,
      setArchivedNotes,
      activeNotes,
      setActiveNotes
    );
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Note
        </h2>
        <NoteForm onSave={handleSaveNoteWrapper} />
      </div>

      <div className="notes-container">
        <div className="active-notes-container">
          <h2>Active Notes</h2>
          <NoteList
            notes={activeNotes}
            onEdit={handleEditNoteWrapper}
            onDelete={handleDeleteNoteWrapper}
            onArchiveToggle={handleArchiveToggleWrapper}
          />
        </div>

        <div div className="archived-notes-container">
          <h2>Archived Notes</h2>
          <NoteList
            notes={archivedNotes}
            onEdit={handleEditNoteWrapper}
            onDelete={handleDeleteNoteWrapper}
            onArchiveToggle={handleArchiveToggleWrapper}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
