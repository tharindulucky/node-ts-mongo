import app from './app';
import config from './config';

app.listen(config.app_port, () => {
    console.log(`App listening on port ${config.app_port}`);
});