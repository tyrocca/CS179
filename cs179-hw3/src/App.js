import React from 'react';
import Note from './Note';
import { defaultNote, makeId, randColor } from './utils';
import BoardHeader from './BoardHeader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.deleteNote = this.deleteNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.state = {
      notes: defaultNote,
    };
  }

  addNote() {
    // This method adds a new note
    const text = prompt("Add your note below", "Example text blah, blah blah...");
    if (!text) {
      return;
    }
    this.setState({
      notes: this.state.notes.concat({
        id: makeId(),
        color: randColor(),
        text,
      }),
    });
  }

  deleteNote(deleteId) {
    // On delete remove the note from the active notes[
    this.setState({
      notes: this.state.notes.filter(({ id }) => id !== deleteId),
    });
  }

  render() {
    // debugger;
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
