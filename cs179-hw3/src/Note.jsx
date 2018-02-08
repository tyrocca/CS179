import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

// This class implements notes
const propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.props.deleteHandler(this.props.id);
  }

  render() {
    return (
      <Draggable>
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
