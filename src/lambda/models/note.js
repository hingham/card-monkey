
import mongoose from 'mongoose';

let NoteSchema = new mongoose.Schema({  
  title: String,
  description: String
});

let notes = mongoose.model('notes', NoteSchema);

export default notes;