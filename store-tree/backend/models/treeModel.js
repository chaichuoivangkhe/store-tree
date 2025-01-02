import mongoose from "mongoose";

const treeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
})

const treeModel = mongoose.model.tree || mongoose.model("tree", treeSchema);
export default treeModel;