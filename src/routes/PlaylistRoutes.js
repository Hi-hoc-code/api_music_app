const express = require('express');
const { getAllPlaylist, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist } = require('../controllers/playlistController');
const { validatePlaylistData } = require('../middlewares/validateData ');
const { checkPlaylistExits } = require('../middlewares/checkExists');
const router = express.Router();

router.get('/:id_user', getAllPlaylist)
router.get('/:id', getPlaylistById)
router.post('/', validatePlaylistData, checkPlaylistExits, createPlaylist)
router.put('/:id', updatePlaylist)
router.delete('/:id', deletePlaylist)


module.exports = router;
