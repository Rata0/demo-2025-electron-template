import { Client } from 'pg';

export default async function connectDB() {
    const client = new Client({
        user: 'postgres',
        password: '12345',
        host: 'localhost',
        port: '5432',
        database: 'gia-demo',
    }); 

    
    await client.connect();
    return client;
};
