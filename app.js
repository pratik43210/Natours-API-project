const express = require('express');
const fs = require( 'fs' );
const morgan= require('morgan');

const tourRouter=require('./routes/tourRoutes');
const userRouter=require('./routes/userRoutes');

const app =  express();

/** Middleware */
//use method adds middleware function to middleware stack
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
app.use(express.json());

//serving static files
app.use(express.static(`${__dirname}/public`));

app.use((req,res,next) => {
    console.log('Hello from the middleware');
    //next method calls the next middleware function in the stack
    next();
});

app.use((req,res,next)=>{
    req.requestTime= new Date().toISOString();
    next();
});

/** Routes */
//Mounting the routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;