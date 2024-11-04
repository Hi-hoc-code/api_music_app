const express = require('express');
const {
    addSong,
    updateSong,
    deleteSong,
    findSongByID,
    findSongByAlbum,
    findSongByArtist,
    findSongByPlayList,
    findSongByTrending,
    fileSongByFavorite
} = require('../controllers/SongController');
const auth = require('../middlewares/auth');
const { validateSongData } = require('../middlewares/validateData ');
const { checkSongExits } = require('../middlewares/checkExists');

const router = express.Router();

router.post('/', validateSongData, checkSongExits, addSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);
router.get('/:id', findSongByID);
router.get('/album/:albumId', findSongByAlbum);
router.get('/artist/:artistId', findSongByArtist);
router.get('/playlist/:playlistId', findSongByPlayList);
router.get('/trending', findSongByTrending);
router.get('/favorites', fileSongByFavorite);

module.exports = router;
