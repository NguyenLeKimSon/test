const express = require('express');
const router = express.Router();

const docController = require('./ModelController');


// router.get('/:_id', docController.show);
router.get('/:_id', docController.show);
router.get('/', docController.get);
router.post('/create', docController.create);
router.put('/edit/:_id', docController.edit)
router.delete('/delete/:_id', docController.delete)






module.exports = router