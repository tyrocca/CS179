import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

// This class implements notes
const propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  defaultPosition: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};


class Note extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  onDelete() {
    this.props.deleteHandler(this.props.id);
  }

  onStop(e, data) {
    window.localStorage.setItem(this.props.id, JSON.stringify({ x: data.x, y: data.y }));
  }

  render() {
    return (
      <Draggable defaultPosition={this.props.defaultPosition} onStop={this.onStop}>
        <div className={`note ${this.props.color}`} >
          <span className="delete-note" onClick={this.onDelete}>X</span>
          <div className="note-content">
            <p>{this.props.text}</p>
          </div>
        </div>
      </Draggable>
    );
  }
}
Note.propTypes = propTypes;

export default Note;
