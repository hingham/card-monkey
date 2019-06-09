import mongoose from "mongoose";

const decksSchema = new mongoose.Schema({
  deck: String,
  user_id: String
});

// module.exports = mongoose.model('Note', NoteSchema);
export default mongoose.model("decks", decksSchema);
