import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NoteService from "../services/NoteService";

const Note = props => {
  const initialNoteState = {
    id: null,
    title: "",
    content: ""
  };
  const [currentNote, setCurrentNote] = useState(initialNoteState);
  const [message, setMessage] = useState("");

  const getTutorial = id => {
    NoteService.get(id)
      .then(response => {
        setCurrentNote(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentNote({ ...currentNote, [name]: value });
  };


  const updateNote = () => {
    NoteService.update(currentNote._id, currentNote)
      .then(response => {
        console.log(response.data);
        setMessage("The note updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteNote = () => {
    NoteService.remove(currentNote._id)
      .then(response => {
        console.log(response.data);
        props.history.push("/notes");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentNote ? (
        <div className="edit-form">
          <h4>Note</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentNote.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="content"
                name="content"
                value={currentNote.content}
                onChange={handleInputChange}
              />
            </div>

          </form>

         
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateNote}
          >
            Update
          </button>
          &nbsp;&nbsp;&nbsp;

          <button
            type="submit"
            className="badge badge-warning"
          >
            <Link to={"/notes"}>
                Cancel
              </Link>
          </button>
          &nbsp;&nbsp;&nbsp;

          <button className="badge badge-danger mr-2" onClick={deleteNote}>
            Delete
          </button>

          
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Note...</p>
        </div>
      )}
    </div>
  );
};

export default Note;