const express=require('express');
const tourController=require('./../controllers/tourController');

const router=express.Router();

//param middleware
// router.param('id', tourController.checkID);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody,tourController.createTour);//chaining middleware

router
    .route('/:id')
    .get(tourController.checkID,tourController.getTour)
    .patch(tourController.checkID,tourController.updateTour)
    .delete(tourController.checkID,tourController.deleteTour);

module.exports = router;