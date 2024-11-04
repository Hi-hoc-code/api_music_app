const validateUserData = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" })
  }
  next();
}
const validateGenreData = (req, res, next) => {
  const { nameGenre, description } = req.body;
  if (!nameGenre || !description) {
    return res.status(400).json({ message: "Thiếu dữ liệu" });
  }
  next();
};

const validateArtistData = (req, res, next) => {
  const { nameArtis, genres, avatar, bio } = req.body;
  if (!nameArtis || !genres || !avatar || !bio) {
    return res.status(400).json({ message: "Thiếu dữ liệu" });
  }
  next();
}
const validateSongData = (req, res, next) => {
  const { nameSong, genre, album, duration, imgSong, audioSong } = req.body;
  if (!nameSong || !genre || !album || !duration || !imgSong || !audioSong) {
    return res.status(400).json({ message: "Thiếu dữ liệu" });
  }
  next();
}
const validatePlaylistData = (req, res, next) => {
  const { namePlaylist, description, user, song, imgPlaylist } = req.body;
  if (!namePlaylist || !description || !user || !song || !imgPlaylist) {
    return res.status(400).json({ message: "Thiếu dữ liệu" });
  }
  next();
}
const validateComposeData = (req, res, next) => {
  const { nameCompose, imgCompose, bioCompose } = req.body;
  if (!nameCompose || !imgCompose || !bioCompose) {
    return res.status(400).json({ message: "Thiếu dữ liệu" })
  }
  next();
}
module.exports = {
  validateArtistData,
  validateGenreData,
  validateSongData,
  validatePlaylistData,
  validateUserData,
  validateComposeData
}