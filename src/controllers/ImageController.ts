import {RequestHandler} from "express";
import {uploadToS3} from "../utils/functions";

export const uploadProfilePic: RequestHandler = async (req: any, res) => {
    try{
        if(req.files?.profilePic.name){
            await uploadToS3(req.files?.profilePic.data, 'somefilename.png', 'test-bucket-coder-awesome');
            return res.status(201).json({
                message: "Success"
            });
        }
        return res.status(400).json({
            message: "Please add a file!"
        });
    }catch (e) {
        return res.status(500).json({
            message: "Something went wrong!"
        });
    }
}