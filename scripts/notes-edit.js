'use strict'

const title = document.querySelector('#note-title');
const body = document.querySelector('#note-body');
const remove = document.querySelector('#remove-note');
const dateElement = document.querySelector('#last-edited');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => note.id == noteId);

// Redirect to the main page if there is no note
if (!note){
  location.assign('index.html');
}

title.value = note.title;
body.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

remove.addEventListener('click', () => {
  removeNote(noteId);
  saveNotes(notes);
  location.assign('index.html');
});

title.addEventListener('input', (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

body.addEventListener('input', (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

window.addEventListener('storage', (e) => {
  if(e.key === 'notes'){
    notes = JSON.parse(e.newValue);
    note = notes.find(note => note.id == noteId);

    if (!note){
      location.assign('index.html');
    }

    title.value = note.title;
    body.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
  }
});