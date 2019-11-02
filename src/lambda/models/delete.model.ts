import mongoose from "mongoose";

const deleteSchema = new mongoose.Schema({
    _id: String
});

// module.exports = mongoose.model('Note', NoteSchema);
export default mongoose.model("delete", deleteSchema);
