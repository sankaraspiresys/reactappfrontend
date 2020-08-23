import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddNote from "./components/AddNote";
import Note from "./components/Note";
import NotesList from "./components/NotesList";

function App() {
 

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/notes" className="navbar-brand">
            Notes
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/notes"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/notes"]} component={NotesList} />
            <Route exact path="/add" component={AddNote} />
            <Route path="/notes/:id" component={Note} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;