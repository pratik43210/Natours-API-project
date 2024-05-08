const express = require('express');
const fs = require( 'fs' );

const app =  express();

app.use(express.json());

// app.get('/', (req,res)=>{
//     res
//         .status(404)
//         .json({message: 'Hello from the server side!', app:'Natours'});
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//we have formatted json response in JSend format
app.get('/api/v1/tours', (req, res)=>{
    res.status(200).json({
        status:'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

//responding to url parameters e.g. url-text.../:id/:x/:y 
//we can make some parameters optional as /api/v1/tours/:id/:x?/:y
app.get('/api/v1/tours/:id', (req,res)=>{
    const requestedTour=tours.find(el=>el.id==req.params.id);
    res.status(200).json({
        status:'success',
        data:{
            tour: requestedTour
        }
    });
});

//express does not include body data in the request so we use middleware- app.use(express.json) in start of the file
//it is called so because it stands between request and response
app.post('/api/v1/tours', (req, res)=>{
    // console.log(req.body);
    const newId = tours[tours.length-1].id+1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        res.status(201).json({
            status:'success',
            data:{
                tour: newTour
            }
        });
    });
});

const port = 3000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}...`);
});