const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const createNewNote = require('./lib/notes');
const notes = require('./db/db.json');
let newNotes = [];

app.get('/api/notes', (req, res) => {
  const result = notes;
  if (result) {
    res.json(result);
  } else {
    res.send(404)
  }
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/api/notes', (req, res) => {
  const note = createNewNote(req.body, notes);
  res.json(note);
});

// app.delete('/api/notes/:id', async (req, res) => {
//   const noteId = req.params.id;
//   console.log(noteId);
//   const deleted = notes.filter(x => x.id != noteId);
  
//   await fs.writeFile(
//     path.join(__dirname, './db/db.json'),
//     JSON.stringify(deleted, null, 2)
//   );
//     //newNotes = notes.filter(x => x.id != noteId);
//     res.json(deleted);
// });

app.listen(PORT, () => {
  console.log(`API server is now on port ${PORT}`);
});