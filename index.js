import express from "express"
import multer from "multer"
import { fileUploadOnCloudinary } from "./utils/cloudinary";
import { upload } from "./middleware/multer.midleware";
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('File Uploading Using Multer and Cloudinary')
})

app.post("/upload",upload.fields([{ name: "avatar", maxCount: 1 }]), async (req,res) => {
    try {
        const avatarImage  = req.files?.avatar[0]?.path;
    
        if(!avatarImage)
        {
            return res.status(500).json("Error Occured While File Saving");
        }
    
        const avatar = await fileUploadOnCloudinary(avatarImage);

        return res.status(200).json("File Uploaded Successfuly!");
    } catch (error) {
        console.log("Error Occured in /upload route", error);
        res.status(500).json("Faild To Upload File")
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

