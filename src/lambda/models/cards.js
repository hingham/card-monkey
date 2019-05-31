import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  deck: String,
  concept: String,
  definition: String,
  deck_id: String,
  deck: String
});

// module.exports = mongoose.model('Note', NoteSchema);
export default mongoose.model("cards", cardSchema);


