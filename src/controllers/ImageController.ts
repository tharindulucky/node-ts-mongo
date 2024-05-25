import {RequestHandler} from "express";
import {deleteFromS3, generatePresignedURL, uploadToS3} from "../utils/functions";
import config from "../config";

export const uploadProfilePic: RequestHandler = async (req: any, res) => {
    try {
        if(req.files.profilePic.name){
            //Upload file
            const result = await uploadToS3(req.files.profilePic, config.aws.bucket);
            return res.status(201).json({
                message: "Success",
                body: result
            });
        }
    }catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Something went wrong!"
        });
    }
}

export const deleteProfilePic: RequestHandler = async (req: any, res) => {
    try {
        if(req.params.filename){
            //Upload file
            const result = await deleteFromS3(req.params.filename, config.aws.bucket);
            return res.status(200).json({
                message: "Success",
                body: result
            });
        }
    }catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Something went wrong!"
        });
    }
}
export const viewFile: RequestHandler = async (req, res) => {
    try {
        if(req.params.filename){
            //Upload file
            const result = await generatePresignedURL(req.params.filename, config.aws.bucket);
            return res.status(200).json({
                message: "Success",
                body: result
            });
        }
    }catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Something went wrong!"
        });
    }
}