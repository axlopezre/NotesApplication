const express = require('express');
const note = require('../modules/noteModule');
const checkIn = require('../modules/checkInModule');
const router = express.Router();

router.post('/api/create-note', note.createNote);
router.get('/api/active-notes', note.getActiveNotes);
router.get('/api/archived-notes', note.getArchivedNotes);

router.put('/api/unarchive-note/:id', note.unarchiveNote);
router.put('/api/archive-note/:id', note.activeNote);
router.put('/api/edit-note/:id', note.editNote);

router.delete('/api/delete-note/:id', note.deleteNote);


router.post('/check-in', checkIn.setCheckIn);

module.exports = router;
