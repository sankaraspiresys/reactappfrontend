import React, { useState, useEffect } from "react";
import NoteService from "../services/NoteService";
import { Link } from "react-router-dom";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [currrentNote, setCurrentNote] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retriveNotes();
  }, []);


  const retriveNotes = () => {
    NoteService.getAll()
      .then(response => {
        setNotes(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };



  const setActiveNote = (note, index) => {
    setCurrentNote(note);
    setCurrentIndex(index);
  };




  return (
    <div className="list row">
      
      <div className="col-md-6">
        <h4>Notes List Test</h4>

        <ul className="list-group">
          {notes &&
            notes.map((note, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveNote(note, index)}
                key={index}
              >
                {note.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currrentNote ? (
          <div>
            <h4>Notes</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currrentNote.title}
            </div>
            <div>
              <label>
                <strong>Content:</strong>
              </label>{" "}
              {currrentNote.content}
            </div>

            <Link
              to={"/notes/" + currrentNote._id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Note11...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesList;