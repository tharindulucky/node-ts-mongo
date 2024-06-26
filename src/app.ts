import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import routes from './routes'

const app = express();

app.use('/api/v1/', routes);

async function connectToDB() {
    try {
        await mongoose.connect(config.db_url, {retryWrites: true, w: 'majority'});
        console.info('Connected to DB')
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

(async () => {
    await connectToDB();
})();

export default app;