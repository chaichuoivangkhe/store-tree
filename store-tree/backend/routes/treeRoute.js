import express from "express"
import { addTree,listTree,removeTree } from "../controllers/treeController.js"
import multer from "multer"
const treeRouter = express.Router();

 // image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)

    }

})
const upload = multer({storage:storage})
treeRouter.post("/add",upload.single("image"),addTree)
treeRouter.get("/list",listTree)
treeRouter.post("/remove",removeTree)
export default treeRouter;