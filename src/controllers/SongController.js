const Song = require('../models/Song');
const Album = require('../models/Album')
const Artist = require('../models/Artist')
const addSong = async (req, res) => {
    const { nameSong, artist, genre, album, releaseYear, duration, imgSong, audioSong } = req.body;

    try {
        const newSong = new Song({
            nameSong,
            artist,
            genre,
            album,
            releaseYear,
            duration,
            imgSong,
            audioSong
        });

        const savedSong = await newSong.save();

        if (album && album.length > 0) {
            await Album.updateMany(
                { _id: { $in: album } },
                { $push: { song: savedSong._id } }
            );
        }

        res.status(201).json(savedSong);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const updateSong = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findByIdAndUpdate(id, req.body, { new: true });
        if (!song) return res.status(404).json({ message: "Song not found" });
        res.json(song);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findByIdAndDelete(id);
        if (!song) return res.status(404).json({ message: "Song not found" });
        res.json({ message: "Song deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findSongByID = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);
        if (!song) return res.status(404).json({ message: "Song not found" });
        res.json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findSongByAlbum = async (req, res) => {
    try {
        const { albumId } = req.params;
        const songs = await Song.find({ album: albumId });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const findSongByArtist = async (req, res) => {
    try {
        const { artistId } = req.params;
        console.log('Artist ID:', artistId);
        const songs = await Song.find({ artist: artistId });
        console.log('Songs found:', songs);
        res.json(songs);
    } catch (error) {
        console.error('Error finding songs:', error);
        res.status(500).json({ message: error.message });
    }
}

const findSongByPlayList = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const songs = await Song.find({ playlist: playlistId });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findSongByTrending = async (req, res) => {
    try {
        const songs = await Song.find().sort({ views: -1 }).limit(10);
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const fileSongByFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const favoriteSongs = await Song.find({ favorite: userId });

        res.json(favoriteSongs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addSong,
    updateSong,
    deleteSong,
    findSongByID,
    findSongByAlbum,
    findSongByArtist,
    findSongByPlayList,
    findSongByTrending,
    fileSongByFavorite
};
