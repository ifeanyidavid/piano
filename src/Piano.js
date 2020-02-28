import React from "react";
import Keyboard from "./Keyboard";

class Piano extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: ""
    };
  }

  accidentalKey = ({ isPlaying, eventHandlers }) => {
    return (
      <div className="piano-accidental-key-wrapper">
        <button
          className={`piano-accidental-key ${
            isPlaying ? "piano-accidental-key-playing" : ""
          } `}
          {...eventHandlers}
        />
      </div>
    );
  };

  naturalKey = ({ isPlaying, text, eventHandlers }) => {
    return (
      <button
        className={`piano-natural-key ${
          isPlaying ? "piano-natural-key-playing" : ""
        } `}
        {...eventHandlers}
      >
        <div className="piano-text">{text}</div>
      </button>
    );
  };

  renderPianoKey = ({
    note,
    isAccidentalNote,
    isNotePlaying,
    startPlayingNote,
    stopPlayingNote
  }) => {
    const KeyComponent = isAccidentalNote
      ? this.accidentalKey
      : this.naturalKey;

    const noteLetter = note.split("")[0];

    /* EVENT HANDLERS */
    const eventHandlers = {
      onMouseDown: startPlayingNote,
      onMouseUp: stopPlayingNote,
      onTouchStart: startPlayingNote,
      onMouseOut: stopPlayingNote,
      onTouchEnd: stopPlayingNote
    };

    return (
      <KeyComponent
        isPlaying={isNotePlaying}
        text={noteLetter}
        eventHandlers={eventHandlers}
      />
    );
  };

  render() {
    return (
      <>
        <Keyboard
          startNote={"C3"}
          endNote={"B3"}
          renderPianoKey={this.renderPianoKey}
        />
      </>
    );
  }
}

export default Piano;
