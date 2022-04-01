const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid'); 

function createnewNote(body, noteArray) {
  const note = body;
  note.id = uniqid();
  console.log(note);
  noteArray.push(note);
  console.log(noteArray);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(noteArray, null, 2)
  );
}


module.exports = createnewNote;