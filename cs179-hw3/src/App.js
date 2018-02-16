import React from 'react';
import Note from './Note';
import { defaultNote, makeId, randColor } from './utils';
import BoardHeader from './BoardHeader';

// Constants
const defaultPlacement = { x: 10, y: 10 };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.deleteNote = this.deleteNote.bind(this);
    this.addNote = this.addNote.bind(this);

    // Load the notes from the localStorage
    let notes = defaultNote;
    if (window.localStorage.getItem('notes')) {
      try {
        notes = JSON.parse(window.localStorage.getItem('notes'));
      } catch (e) {
        notes = defaultNote;
      }
    }

    // Set the position for each note (get from localStorage)
    notes = notes.map((note) => {
      let defaultPosition = defaultPlacement;
      if (window.localStorage.getItem(note.id)) {
        try {
          defaultPosition = JSON.parse(window.localStorage.getItem(note.id));
        } catch (e) {
          defaultPosition = defaultPlacement;
        }
      }
      return Object.assign({}, note, { defaultPosition });
    });
    // Set State at end
    this.state = { notes };
  }

  addNote() {
    // This method adds a new note
    const text = prompt('Add your note below', 'Example text blah, blah blah...');
    if (!text) {
      return;
    }
    const notes = this.state.notes.concat({
      id: makeId(),
      color: randColor(),
      defaultPosition: defaultPlacement,
      text,
    });
    this.setState({ notes });

    // update local storage
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }

  deleteNote(deleteId) {
    // On delete remove the note from the active notes[
    const notes = this.state.notes.filter(({ id }) => id !== deleteId);
    this.setState({ notes });
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }

  render() {
    return (
      <div className="container">
        <BoardHeader onAddNote={this.addNote} />
        <div className="corkboard">
          {this.state.notes.map(note => (
            <Note key={note.id} deleteHandler={this.deleteNote} {...note} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
