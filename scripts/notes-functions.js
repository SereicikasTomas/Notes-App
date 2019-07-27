'use strict'

// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes');
  //Check if the value for parsing is correct
  try{
    return notesJSON ? JSON.parse(notesJSON): [];
  }catch(e){
    return [];
  }
}

// Save the notes to local storage
const saveNotes = (notes) => localStorage.setItem('notes', JSON.stringify(notes));

// Remove a note
const removeNote = (id) => {
  const index = notes.findIndex(note => note.id == id);
  if(index > -1){
    notes.splice(index, 1);
  }
}

// Genereate the DOM structure for a note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement('a');
  const noteText = document.createElement('p');
  const statusEl = document.createElement('p');

  if(note.title.length > 0){
    noteText.textContent = note.title;
  } else {
    noteText.textContent = 'Unnamed note';
  }
  noteText.classList.add('list-item__title');
  noteEl.appendChild(noteText);

  // Setup the link
  noteEl.setAttribute('href', `edit.html#${note.id}`);
  noteEl.classList.add('list-item');

  // Setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add('list-item__subtitle');
  noteEl.appendChild(statusEl); 

  return noteEl;
}

// Sort notes by one of three ways
const sortNotes = (notes, sortBy) => {
  if(sortBy === 'byEdited'){
    return notes.sort((a,b) => {
      if(a.updatedAt > b.updatedAt){
        return -1;
      }else if(a.updatedAt < b.updatedAt){
        return 1;
      }else{
        return 0;
      }
    })
  }else if(sortBy === 'byCreated'){
    return notes.sort((a,b) => {
      if(a.createdAt > b.createdAt){
        return -1;
      }else if(a.createdAt < b.createdAt){
        return 1;
      }else{
        return 0;
      }
    })
  }else if(sortBy === 'alphabetical'){
    return notes.sort((a,b) => {
      if(a.title.toLowerCase() < b.title.toLowerCase()){
        return -1;
      }else if(a.title.toLowerCase() > b.title.toLowerCase()){
        return 1;
      }else{
        return 0;
      }
    })
  }else{
    return notes;
  }
}

// Render application notes
const renderNotes = (notes, filters) => {
  const notesEl = document.querySelector('#notes');
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

  notesEl.innerHTML = '';

  if(filteredNotes.length > 0){
    filteredNotes.forEach(note => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    })
  }else{
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No notes to show.';
    emptyMessage.classList.add('empty-message');
    notesEl.appendChild(emptyMessage);
  }
}

// Generate the last edited message
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`;