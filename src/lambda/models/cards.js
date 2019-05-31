import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  deck: String,
  concept: String,
  definition: String
});

// module.exports = mongoose.model('Note', NoteSchema);
export default mongoose.model("cards", cardSchema);


