const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser.js");
const Note = require("../models/Notes.js");
const { body, validationResult } = require("express-validator");
const { findById } = require("../models/User.js");

// ROUTE 1 :  Fetching ALL notes : GET "/api/notes/fetchallnotes" . Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // Handle any potential errors during the database operation
    res.status(500).json({ error: error.message });
  }
});

// ROUTE 2 :  Adding a new Note : POST "/api/notes/addnote" . Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid Description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {

        const { title, description, tag } = req.body;

      const result = validationResult(req);
      if (!result.isEmpty()) {
        // Validation errors, send response with errors
        return res.status(400).json({ errors: result.array() });
      }

      

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      // Handle any potential errors during the database operation
      res.status(500).json({ error: error.message });
    }
  }
);

// ROUTE 3 :  Update an existing Note : PUT "/api/notes/updatenote" . Login Required

router.put("/updatenote/:id",fetchuser,async (req, res) => {

    const {title , description , tag} = req.body;

    try {
        // CREATE A NEW NOTE OBJECT
    const newNote = {}
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    // Find the note to be updated and update it

    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true})
    res.json({note});
        
    } catch (error) {
        // Handle any potential errors during the database operation
      res.status(500).json({ error: error.message });
    }

    
})


// ROUTE 4 :  Delete an existing Note : DELETE "/api/notes/deletenote" . Login Required

router.delete("/deletenote/:id",fetchuser,async (req, res) => {

    

    try {
          // Find the note to be deleted and delete it

    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not found")}

    // Allow deletetion only if user owns it

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Note has been deleted"});
    } catch (error) {
        // Handle any potential errors during the database operation
      res.status(500).json({ error: error.message });
    }

   

  
})

module.exports = router;
