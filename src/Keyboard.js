import React, { Fragment } from "react";
import isAccidentalNote from "./isAccidentalNote";
import getNotesBetween from "./getNotesBetween";

class Keyboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      value: "",
      note: "",
      notesPlaying: []
    };
  }

  onPlayNoteStart = note => {
    const { notesPlaying } = this.state;
    this.setState({
      ...this.state,
      note: note,
      notesPlaying: [...notesPlaying, note]
    });
  };

  onPlayNoteEnd = note => {
    const { notesPlaying } = this.state;
    this.setState({
      ...this.state,
      notesPlaying: notesPlaying.filter(notePlaying => notePlaying !== note)
    });
  };

  handlePlay = () => {
    const { value } = this.state;

    const notes = value.split(",");

    this.id = setInterval(() => {
      let { count } = this.state;

      if (count === notes.length) {
        clearInterval(this.id);
        this.setState(prevState => ({
          notesPlaying: [],
          note: "",
          value: "",
          count: prevState.count - notes.length - 1
        }));
      }

      if (notes[count]) {
        this.onPlayNoteStart(notes[count]);
      }

      this.setState(prevState => ({ count: prevState.count + 1 }));
    }, 1000);
  };

  handleChange = e => {
    this.setState({ value: e.target.value.toUpperCase() });
  };

  render() {
    const { startNote, endNote, renderPianoKey } = this.props;
    const { notesPlaying, note, value } = this.state;
    //rendering piano keys
    // c3 b3
    const notes = getNotesBetween(startNote, endNote);

    return (
      <Fragment>
        <div className="piano-container">
          {notes.map(note => {
            return (
              <Fragment key={note}>
                {renderPianoKey({
                  note,
                  isAccidentalNote: isAccidentalNote(note),
                  isNotePlaying: notesPlaying.includes(note),
                  startPlayingNote: () => this.onPlayNoteStart(note),
                  stopPlayingNote: () => this.onPlayNoteEnd(note)
                })}
              </Fragment>
            );
          })}
        </div>
        <div className="log-container">
          <div className="played-note">{note}</div>
          <div>
            <p>
              Allowed notes: C3, C#3, D3, D#3, E3, F3, F#3, G3, G#3, A3, A#3, B3
            </p>
            <input type="text" value={value} onChange={this.handleChange} />
            <button onClick={this.handlePlay}>Play</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Keyboard;
