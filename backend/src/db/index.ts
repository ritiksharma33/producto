import {drizzle} from 'drizzle-orm/node-postgres';
import {Pool} from 'pg';
import {ENV} from '../config/env';
import * as schema from './schema';

if(!ENV.DATABASE_URL){
    throw new Error("DATABASE_URL is not defined in environment variables");
}
//innitiling the connection pool to our database using pg library
const pool =new Pool({
    connectionString:ENV.DATABASE_URL,
})
//log when frist connection is made
pool.on('connect',()=>{
    console.log("Connected to the database ✅ ");
})
//log when erorr
pool.on("error",(err)=>{
    console.error(" 💣 Database connection error:",err);
})

export const db=drizzle({client:pool, schema});
//connection pool is used to manage multiple connections to the database and drizzle is used to interact with the database using our defined schema