import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    name: String,
    team: String
  });

// module.exports = mongoose.model('Note', NoteSchema);
let players = mongoose.model('players', schema);

export default players;