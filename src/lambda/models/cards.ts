import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  deck: { type: String, required: true },
  concept: { type: String, required: true },
  definition: { type: String, required: true },
  deck_id: { type: String, required: true },
});

export default mongoose.model("cards", cardSchema);


