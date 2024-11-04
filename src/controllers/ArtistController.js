const Artist = require('../models/Artist');

const getAllArtist = async (req, res) => {
    try {
        const artists = await Artist.find().populate('genres');
        res.status(200).json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id).populate('genres');
        if (!artist) return res.status(404).json({ message: 'Artist not found' });
        res.status(200).json(artist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const createArtist = async (req, res) => {
    const { name, bio, genres, avatar } = req.body;

    if (!name) {
        return res.status(400).json({ message: "'name' is required." });
    }

    const artist = new Artist({ name, bio, genres, avatar });

    try {
        const savedArtist = await artist.save();
        res.status(201).json(savedArtist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateArtist = async (req, res) => {
    try {
        const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedArtist) return res.status(404).json({ message: 'Artist not found' });
        res.status(200).json(updatedArtist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteArtist = async (req, res) => {
    try {
        const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
        if (!deletedArtist) return res.status(404).json({ message: 'Artist not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllArtist, getArtistById, createArtist, updateArtist, deleteArtist };
