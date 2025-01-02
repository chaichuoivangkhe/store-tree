import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://Nghi1234:Nghi1234@cluster0.ey590.mongodb.net/store-tree').then(()=>console.log("DB connected"))
}