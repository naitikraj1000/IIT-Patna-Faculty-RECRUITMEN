import { PrismaClient } from '@prisma/client';


const prismadb = new PrismaClient();

async function connectdb() {
    await prismadb.$connect();
    console.log('Database connected successfully');
}



export default prismadb;
export { connectdb };