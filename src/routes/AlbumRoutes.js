const express = require('express');
const { getAllAlbum, getAlbumById, createAlbum, updateAlbum, deleteAlbum } = require('../controllers/AlbumController');
const multer = require('../middlewares/multer'); 
const router = express.Router();


router.get('/', getAllAlbum);
router.get('/:id', getAlbumById);
router.post('/', multer.single('imgAlbum'), createAlbum);
router.put('/', updateAlbum);
router.delete('/:id', deleteAlbum);



module.exports = router;
