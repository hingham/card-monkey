import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    login: String,
    scope: String,
    git_id: Number,
  });

// module.exports = mongoose.model('Note', NoteSchema);
let users = mongoose.model('users', schema);

export default users;