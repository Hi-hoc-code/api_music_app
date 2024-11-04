const Artist = require('../models/Artist');
const Compose = require('../models/Compose');
const Genre = require('../models/Genre');
const Song = require('../models/Song');
const User = require('../models/User');

const checkUserExists = async (req, res, next) => {
  const { username, email } = req.body;
  const existsUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existsUser) {
    return res.status(400).json({ message: 'Tài khoản đã tồn tại' });
  }
  next();
};

const checkGenreExists = async (req, res, next) => {
  const { nameGenre } = req.body;
  const existingGenre = await Genre.findOne({ nameGenre });
  if (existingGenre) {
    return res.status(400).json({ message: 'Thể loại đã tồn tại.' });
  }
  next();
};

const checkArtistExists = async (req, res, next) => {
  const { nameArtist } = req.body;
  const existingArtist = await Artist.findOne({ nameArtist });
  if (existingArtist) {
    return res.status(400).json({ message: 'Tên nghệ sĩ đã tồn tại' });
  }
  next();
};
const checkSongExits = async (req, res, next) => {
  const { nameSong } = req.body;
  const existingSong = await Song.findOne({ nameSong });
  if (existingSong) {
    return res.status(400).json({ message: 'Bài hát đã tồn tại' })
  }
  next();
}
const checkPlaylistExits = async (req, res, next) => {
  const { namePlaylist } = req.body;
  const existingPlaylist = await Artist.findOne({ namePlaylist });
  if (existingPlaylist) {
    return res.status(400).json({ message: 'PLaylist đã tồn tại' })
  }
  next();
}
const checkComposeExists = async (req, res, next) => {
  const { nameCompose } = req.body;
  const existsCompose = await Compose.findOne({ nameCompose });
  if (existsCompose) {
    return res.status(400).json({ message: "Tác giả đã tồn tại" })
  }
  next();
}
module.exports = {
  checkUserExists,
  checkGenreExists,
  checkArtistExists,
  checkSongExits,
  checkPlaylistExits,
  checkComposeExists
};
