const express = require('express');
const { getAllGenre, getGenreById, createGenre, updateGenre, deleteGenre } = require('../controllers/GenreController');
const upload = require('../middlewares/multer');
const { validateGenreData } = require('../middlewares/validateData ');
const { checkGenreExists } = require('../middlewares/checkExists');

const router = express.Router();

router.get('/', getAllGenre);
router.get('/:id', getGenreById);
router.post('/', upload.single('imgGenre'), validateGenreData, checkGenreExists, createGenre);
router.put('/:id', upload.single('imgGenre'), updateGenre);
router.delete('/:id', deleteGenre);

module.exports = router;
