import React from 'react';
import PropTypes from 'prop-types';

/*
 * This is the corkboard header
 */
const propTypes = {
  onAddNote: PropTypes.func.isRequired,
};
const BoardHeader = ({ onAddNote }) => (
  <div id="corkboard-header">
    <span className="header-text">
      My Notes
    </span>
    <button id="add-note" onClick={onAddNote}>
      + Click to Add Note
    </button>
  </div>
);
BoardHeader.propTypes = propTypes;

export default BoardHeader;
