import dotenv from 'dotenv';

dotenv.config();

const config = {
    app_name: process.env['APP_NAME'] ?? 'Blog API',
    app_port: process.env['APP_PORT'] ?? 3000,
    db_url: process.env['DB_URL'] ?? 'mongodb://localhost:27017/blog_api_ts',
    aws:{
        bucket: process.env['AWS_S3_BUCKET'] ?? '',
        region: process.env['AWS_REGION'] ?? '',
        access_key: process.env['AWS_ACCESS_KEY_ID'] ?? '',
        secret_key: process.env['AWS_SECRET_ACCESS_KEY'] ?? '',
    }
}

export default config;