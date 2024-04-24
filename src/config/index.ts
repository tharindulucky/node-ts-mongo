import dotenv from 'dotenv';

dotenv.config();

const config = {
    app_name: process.env['APP_NAME'] ?? 'Blog API',
    app_port: process.env['APP_PORT'] ?? 3000,
    db_url: process.env['DB_URL'] ?? 'mongodb://localhost:27017/blog_api_ts',
}

export default config;