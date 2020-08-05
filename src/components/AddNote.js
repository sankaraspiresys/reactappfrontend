import React, { useState } from "react";
import NoteService from "../services/NoteService";

const AddNote = () => {
  const initialNoteState = {
    id: null,
    title: "",
    content: ""
  };
  const [note, setNote] = useState(initialNoteState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const saveNote = () => {
    var data = {
      "title": note.title,
      "content": note.content
    };
    NoteService.create(data)
      .then(response => {
        setNote({
          id: response.data.id,
          title: response.data.title,
          content: response.data.content
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newNote = () => {
    setNote(initialNoteState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newNote}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={note.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Content</label>
            <input
              type="text"
              className="form-control"
              id="content"
              required
              value={note.content}
              onChange={handleInputChange}
              name="content"
            />
          </div>

          <button onClick={saveNote} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNote;