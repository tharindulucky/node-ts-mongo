import AWS from 'aws-sdk';
import config from "../config";
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;
export const uploadToS3 = async (file: any, fileName: string, bucketName: string) => {
    try {
        const s3 = new AWS.S3({
            credentials:{
                accessKeyId: config.aws_key,
                secretAccessKey: config.aws_secret
            }
        });

        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: file
        };

        s3.upload(params, {},(err: Error, data: SendData) => {
            if(err){
               console.log("something went wrong!");
               return;
            } else {
                console.log("Success")
            }
        })
    }catch (e) {
        return e;
    }
}