const Note = require('../models/Note')

// Route to create a parking lot
const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    // Check if the note title is already in use in the database
    const existingNote = await Note.findOne({
      where: { title: title }
    })
    if (existingNote) {
      return res.status(400).json({ error: 'The note title is already in use.' });
    }

    // Create the note in the database
    const newNote = await Note.create({
      title,
      content,
      archived: false
    });

    // Return the information of the created parking lot and its unique ID
    res.status(201).json({ id: newNote.id, ...newNote.toJSON() });
  } catch (error) {
    console.error('Error creating Note:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  };
};

// Route to get the list of parking lots paginated and ordered
const getActiveNotes = async (req, res) => {
  try {
    const activeNote = await Note.findAll({
      where: { archived: false }
    });

    return res.json({
      data: activeNote,
    });
  } catch (error) {
    console.error('Error getting parking list:', error)
    res.status(500).json({ error: 'Internal Server Error.' })
  }
};

const editNote = async (req, res) => {
  const { id } = req.params
  const { title, content} = req.body

  try {
    if (isNaN(id)) return res.status(400).json({ error: 'The ID must to be a number.' });

    const note = await Note.findByPk(id);

    if (!note) return res.status(404).json({ error: 'Note not found.' })

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    await note.save();
    res.json(note.toJSON());
  } catch (error) {
    console.error('Error editing note:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
};

const getArchivedNotes = async (req, res) => {
  try {
    const activeNote = await Note.findAll({
      where: { archived: true }
    });

    return res.json({
      data: activeNote,
    });
  } catch (error) {
    console.error('Error getting parking list:', error)
    res.status(500).json({ error: 'Internal Server Error.' })
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params

  try {
    const deletedNote = await Note.destroy({
      where: {
        id
      }
    });

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unarchiveNote = async (req, res) => {
  const { id } = req.params;
  const { archived } = req.body;
  try {
    if (isNaN(id)) return res.status(400).json({ error: 'The ID must to be a number.' });
    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ error: 'Note not found.' })

    if (archived !== undefined) note.archived = archived;
    await note.save();
    res.json(note.toJSON());

  } catch (error) {
    console.error('Error editing note:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
};

const activeNote = async (req, res) => {
  const { id } = req.params;
  const { archived } = req.body

  try {
    if (isNaN(id)) return res.status(400).json({ error: 'The ID must to be a number.' });
    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ error: 'Note not found.' })

    if (archived !== undefined) note.archived = archived;
    await note.save();
    res.json(note.toJSON());
    
  } catch (error) {
    console.error('Error editing note:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
};

module.exports = { createNote, getActiveNotes, editNote, deleteNote, getArchivedNotes, unarchiveNote, activeNote }
