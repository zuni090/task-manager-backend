const mongoose = require('mongoose');
const colors = require('colors');

const connectDatabase = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI ,  {
            useNewUrlParser: true, // Note: useNewUrlParser is no longer needed, but you can keep it for now
          useUnifiedTopology: true, // Note: useUnifiedTopology is no longer needed, but you can keep it for now
            w: "majority"
        });

        console.log(`Connected to database : ${conn.connection.host}`.green.bold.underline);
    }
    catch(error){
        console.log(`Error : ${error.message}`.red.bold);
        process.exit();
    }
};

module.exports = connectDatabase;
