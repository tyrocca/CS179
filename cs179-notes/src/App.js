import React from 'react';
import Note from './Note';
import { defaultNote, makeId, randColor, weatherAPIKey } from './utils';
import BoardHeader from './BoardHeader';

// Constants
const defaultPlacement = { x: 10, y: 10 };

// Function for getting the weather
// export function getWeather() {
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.deleteNote = this.deleteNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.processWeather = this.processWeather.bind(this);

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

  componentDidMount() {
    this.getWeather();
  }

  getWeather() {
    /// Function to get the weather
    navigator.geolocation.getCurrentPosition((loc) => {
      if (loc.coords && loc.coords.latitude && loc.coords.longitude) {
        // I hate this long line - apologies for the bad style
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&appid=${weatherAPIKey}`)
          .then(response => response.json())
          .then(this.processWeather);
      } else {
        console.log("There was an error getting location from the browser");
      }
    });
  }

  processWeather(json) {
    let text = `Weather for: ${(new Date()).toString()}. `;
    json.weather.forEach((elt) => {
      text += `${elt.main}: ${elt.description}. `;
    });

    let hasWeather = false;
    let notes = this.state.notes.map((note) => {
      if (note.id !== 'weather') {
        return note;
      }
      // otherwise update weather
      hasWeather = true;
      return Object.assign({}, note, { text });
    });

    // if it isn't present
    if (!hasWeather) {
      notes = notes.concat({
        id: 'weather',
        color: randColor(),
        defaultPosition: { x: 10, y: 300 },
        text,
      });
    }
    // update state
    window.localStorage.setItem('notes', JSON.stringify(notes));
    this.setState({ notes });
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
    // remove from local storage
    window.localStorage.removeItem(deleteId);
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
