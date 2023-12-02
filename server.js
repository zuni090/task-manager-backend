const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const express = require('express');
const connectDatabase = require('./config/database');

const taskRoutes = require('./Routes/taskRoutes');

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
connectDatabase();


const PORT = 5000;

app.get('/',(req,res)=>{
    res.send("API is running!");
});

app.use('/api/task',taskRoutes);
app.listen(PORT,console.log(`Server started on port ${PORT}!`.yellow.bold));
