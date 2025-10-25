import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();


app.get("/",(req,res)=>{
    res.send('Welcome to the server!');
})


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log('Server is running on port 5000...')});
