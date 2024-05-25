import {PutObjectCommand, S3Client, DeleteObjectCommand} from "@aws-sdk/client-s3";
import {S3RequestPresigner} from "@aws-sdk/s3-request-presigner";
import {parseUrl} from "@smithy/url-parser";
import {formatUrl} from "@aws-sdk/util-format-url";
import {Hash} from "@smithy/hash-node";
import {HttpRequest} from "@smithy/protocol-http";

import config from "../config";
export const uploadToS3 = async (file: any, bucketName: string) => {
    try{
        const client = new S3Client({
            region: config.aws.region,
            credentials: {
                accessKeyId: config.aws.access_key,
                secretAccessKey: config.aws.secret_key
            }
        });

        const newFileName = `pic_${(Date.now()).toString()}.${file.mimetype.split('/')[1]}`

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: newFileName,
            Body: file.data
        });

        return await client.send(command);
    }catch (e) {
        return e;
    }
}

export const deleteFromS3 = async (filename: string, bucketName: string) => {
    try{
        const client = new S3Client({
            region: config.aws.region,
            credentials: {
                accessKeyId: config.aws.access_key,
                secretAccessKey: config.aws.secret_key
            }
        });

        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: filename
        });

        return await client.send(command);
    }catch (e) {
        return e;
    }
}

export const generatePresignedURL = async (filename: string, bucketName: string) => {
    try {
        const url = parseUrl(`https://${bucketName}.s3.${config.aws.region}.amazonaws.com/${filename}`);

        const s3Presigner = new S3RequestPresigner({
            region: config.aws.region,
            credentials: {
                accessKeyId: config.aws.access_key,
                secretAccessKey: config.aws.secret_key
            },
            sha256: Hash.bind(null, "sha256")
        });

        const presigedUrlObj = await s3Presigner.presign(new HttpRequest({
            ...url, method: "GET"
        }));

        return formatUrl(presigedUrlObj);
    } catch (e) {
        return e;
    }
}