const dotenv=require('dotenv');

// only need to define this once in this file
dotenv.config({path: './config.env'});
// console.log(process.env);
const app=require('./app');

const port = 3000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}...`);
});