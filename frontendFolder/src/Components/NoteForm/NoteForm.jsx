import React, { useState, useEffect } from 'react';

const NoteForm = ({ onSave, noteToEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteData = {
      id: noteToEdit ? noteToEdit.id : null,
      title,
      content
    };
    onSave(noteData);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <label className='title-label' style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label className='content-label' style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Content:
          <textarea style={{ 
            width: '100%', 
            height: '200px', 
            padding: '8px', 
            borderRadius: '5px', 
            border: '1px solid #ccc',
            resize: 'vertical' }}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
        </label>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button type="submit">{noteToEdit ? 'Update' : 'Save'}</button>
      </div>
    </form>
  );
};

export default NoteForm;