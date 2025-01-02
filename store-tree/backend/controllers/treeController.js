import treeModel from "../models/treeModel.js";
import fs from 'fs'

// Thêm cây mới
const addTree =  async (req ,res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Vui lòng tải lên hình ảnh cây" });
    }

    let image_filename = `${req.file.filename}`;

    const tree = new treeModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await tree.save();
        res.json({ success: true, message: "Cây đã được thêm" });
    } catch (error) {
        console.log(error); 
        res.status(500).json({ success: false, message: "Thất bại khi thêm cây", error });
    }
};

// Lấy danh sách tất cả cây
const listTree = async (req, res) => {
    try {
        const trees = await treeModel.find();  // Sử dụng treeModel thay vì Tree
        res.status(200).json({ success: true, data: trees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Lỗi server", error });
    }
};

// Xóa cây
const removeTree = async (req, res) => {
    try {
        const tree = await treeModel.findById(req.body.id);
        if (tree && tree.image) {
            // Xóa ảnh khỏi thư mục uploads
            fs.unlink(`uploads/${tree.image}`, (err) => {
                if (err) console.error("Lỗi khi xóa ảnh:", err);
            });
        }
        await treeModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Cây đã được xóa" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi khi xóa cây", error });
    }
};

export { addTree, listTree, removeTree };
