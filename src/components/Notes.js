import React, { useContext,useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem.js";
import './note.css'
import AddNote from "./AddNote.js";
import './no-notes.css';
import { useNavigate } from "react-router-dom";



function Notes(props) {
    
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const {notes, getNotes ,editNote} = context;
    useEffect(() => {
      const token = localStorage.getItem('token');
    
      console.log('Token from localStorage:', token);
    
      if (token) {
        console.log('Token exists. Calling getNotes()');
        getNotes();
      } else {
        console.log('Token does not exist. Navigating to /login');
        navigate('/login');
      }
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id:"",etitle:"" , edescription:"" , etag:""})

    const updateNote = (currentNote)=>{
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }
    
    const handleClick = (e) => {
      e.preventDefault();
      console.log("Updating the note...",note);
      refClose.current.click();
      editNote(note.id,note.etitle,note.edescription,note.etag);
      props.showAlert("Note Updated Successfully !","success")
      

      
};

const onChange = (e) => {
    setNote({...note, [e.target.name] : e.target.value})
}

  return (
    <>
    
    <AddNote/>
   
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div>
        <div className="containerr">
          <h2 className="app-title">iNotebook App</h2>
          <form className="note-form">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              id="etitle"
              name="etitle"
              className="form-input"
              required
              value={note.etitle}
              onChange={onChange}
            />
            <label htmlFor="tag" className="form-label">
              Tag:
            </label>
            <input
              type="text"
              id="etag"
              name="etag"
              className="form-input"
              required
              value={note.etag}
              onChange={onChange}
            />

            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              id="edescription"
              name="edescription"
              className="form-textarea"
              required
              value={note.edescription}
              onChange={onChange}
            ></textarea>
          </form>
        </div>
      </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
        <h2 className="note-head">YOUR NOTES</h2>

        {notes.length === 0 ? (
                    // Display a message when there are no notes
                    <div className="no-notes-message">
                        <p>No notes to display. Add a new note!</p>
                    </div>
                ) : (
                    // Display the list of notes
                    notes.map((note) => {
                        return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />;
                    })
                )}
      </div>
      </> 
  )
}

export default Notes
