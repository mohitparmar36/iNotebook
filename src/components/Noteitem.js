import React , {useContext}  from "react";
import "./Noteitem.css";
import noteContext from "../context/notes/NoteContext"


function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const {note , updateNote} = props;

 
  
  return (
    <div class="notes-container">
      <div class="note-list">
        <div class="note-item">
          <h3 class="note-title">{note.title}</h3>
          <p class="note-description">
            {note.description}
          </p>
          <div class="note-actions">
            <button class="action-button">
              <i class="fas fa-edit" onClick={()=>{updateNote(note)}}></i>
            </button>
            <button class="action-button">
              <i class="fas fa-trash-alt" onClick={() =>{
                console.log("HELLO")
                deleteNote(note._id)
                props.showAlert("Deleted Successfully !","danger")
                }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
