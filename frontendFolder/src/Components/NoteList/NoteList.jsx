import React, { useState } from 'react';

const NoteList = ({ notes, onEdit, onDelete, onArchiveToggle }) => {
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const handleEditClick = (note) => {
    setEditingNoteId(note.id);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  const handleSaveClick = () => {
    if (editedTitle.trim() !== '' && editedContent.trim() !== '') {
      onEdit({editingNoteId, editedTitle, editedContent});
      setEditingNoteId(null);
    } else {
      alert('Please enter title and content');
    }
  };

  const handleCancelClick = () => {
    setEditingNoteId(null);
  };

 return (
    <div>
      {notes.map((note, index) => (
        <div key={index} style={{ backgroundColor: '#ffffff', color: 'blue', borderRadius: '20px', padding: '5px', marginTop: '30px'}}>
          {editingNoteId === note.id ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Enter title"
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Enter content"
              />
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleEditClick(note)}>Edit</button>
              <button onClick={() => onDelete(note.id)}>Delete</button>
              <button onClick={() => onArchiveToggle(note.id, note.archived)}>
                {note.archived ? 'Unarchive' : 'Archive'}
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default NoteList;