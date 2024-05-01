import express from 'express';
import {uploadProfilePic} from "../controllers/ImageController";

const routes = express.Router();

routes.get('/ping', (req, res, next) =>{
    console.info("OK!");
    res.status(200).json({message: "OK!"})
});

routes.post('/profile-pic', uploadProfilePic);

routes.use((req, res, next) => {
    const error = new Error('Not found!')
    console.error(error);
    return res.status(404).json({message: error.message});
});

export default routes;