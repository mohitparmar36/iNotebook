import { React, useContext, useState } from "react";
import "./AddNote.css";
import noteContext from "../context/notes/NoteContext";

function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title:"" , description:"" , tag:""})

  const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description,note.tag);
        setNote({title:"" , description:"" , tag:""});
        
  };

  const onChange = (e) => {
      setNote({...note, [e.target.name] : e.target.value})
  }
  return (
    <>
      <div>
        <div className="containerr">
          <h2 className="app-title">iNotebook App</h2>
          <form className="note-form">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              required
              value={note.title}
              onChange={onChange}
            />
            <label htmlFor="tag" className="form-label">
              Tag:
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              className="form-input"
              required
              value={note.tag}
              onChange={onChange}
            />

            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              required
              value={note.description}
              onChange={onChange}
            ></textarea>

            <button type="submit" className="form-button" onClick={handleClick}>
              Save Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddNote;
