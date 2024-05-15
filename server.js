const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=require('./app');

// only need to define this once in this file
dotenv.config({path: './config.env'});
// console.log(process.env);

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false
    })
    .then(con=>console.log('DB connection successful'));


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}...`);
});