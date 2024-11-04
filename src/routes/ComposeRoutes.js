const express = require('express');
const { validateComposeData } = require('../middlewares/validateData ');
const { checkComposeExists } = require('../middlewares/checkExists');
const { getAllCompose, getComposeById, createCompose, updateCompose, deleteCompose } = require('../controllers/ComposeController');
const router = express.Router();

router.get('/', getAllCompose);
router.get('/:id', getComposeById);
router.post('/', validateComposeData, checkComposeExists, createCompose);
router.put('/:id', updateCompose);
router.delete('/:id', deleteCompose);

module.exports = router;
