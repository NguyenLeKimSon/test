const express = require('express');
const router = express.Router();

const docController = require('./ModelController');


// router.get('/:_id', docController.show);
router.get('/display', docController.display)
router.get('/:_id', docController.show);
router.get('/', docController.get);
router.post('/create', docController.create);
router.put('/edit', docController.edit)
router.put('/update/:_id', docController.update)
router.delete('/delete/:_id', docController.delete)






module.exports = router