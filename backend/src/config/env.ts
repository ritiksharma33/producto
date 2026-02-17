import dotenv from 'dotenv';
// Load environment variables from .env file
//quiet true make shure not to flash how many env var we have 
dotenv.config( {quiet: true});
export const ENV={
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL,
    NODE_ENV:process.env.NODE_ENV,
    CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,

   FRONTEND_URL: process.env.FRONTEND_URL
}