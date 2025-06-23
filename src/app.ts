import express from 'express';
import cors from 'cors';
import config from './config/config';
import router from './Routes/api';
import server from './server';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

server();

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Assignment 3 API',
    })
})

app.listen(config.port, ( )=> {
    console.log(`✅ Server is running on ${config.port}`);
    
});