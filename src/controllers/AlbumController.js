const Album = require('../models/Album');
const Song = require('../models/Song');

const getAllAlbum = async (req, res) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (err) {
        console.error("Lỗi khi lấy tất cả album:", err);
        res.status(500).json({ message: "Có lỗi xảy ra khi lấy album." });
    }
};

const getAlbumById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).json({ message: "Album không tìm thấy." });
        }
        res.status(200).json(album);
    } catch (err) {
        console.error("Lỗi khi lấy album:", err);
        res.status(500).json({ message: "Có lỗi xảy ra khi lấy album." });
    }
};

const createAlbum = async (req, res) => {
    try {
        const { title, artist, genre, releaseYear, imgAlbum, song } = req.body;

        // Tạo và lưu album mới
        const newAlbum = new Album({
            title,
            artist,
            genre,
            releaseYear,
            imgAlbum,
            song
        });
        const savedAlbum = await newAlbum.save();
        // Cập nhật mỗi bài hát trong danh sách song với albumId mới
        if (song && song.length > 0) {
            await Song.updateMany(
                { _id: { $in: song } },  // Điều kiện: các bài hát có ID nằm trong mảng song
                { $push: { album: savedAlbum._id } }  // Thêm album ID vào mảng album của mỗi bài hát
            );
        }

        res.status(201).json(savedAlbum);
    } catch (error) {
        console.error('Error creating album:', error);
        res.status(500).json({ message: 'Error creating album', error });
    }
};

const updateAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        console.log(albumId)
        // Xây dựng đối tượng cập nhật chỉ chứa các trường cần thiết
        const updateFields = {};
        const allowedFields = ['title', 'artist', 'genre', 'releaseYear', 'imgAlbum', 'song'];

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updateFields[field] = req.body[field];
            }
        }
        console.log(req.body)
        // Cập nhật album
        const updatedAlbum = await Album.findByIdAndUpdate(
            albumId, req.body
            ,
            { new: true, runValidators: true } // Chạy validator nếu cần
        );

        if (!updatedAlbum) {
            return res.status(404).json({ message: "Album không tìm thấy." });
        }

        res.status(200).json(updatedAlbum);
    } catch (err) {
        console.error("Lỗi khi cập nhật album:", err);
        res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật album." });
    }
};


const deleteAlbum = async (req, res) => {
    try {
        const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) {
            return res.status(404).json({ message: "Album không tìm thấy." });
        }
        res.status(200).json({ message: "Album đã được xóa thành công." });
    } catch (err) {
        console.error("Lỗi khi xóa album:", err);
        res.status(500).json({ message: "Có lỗi xảy ra khi xóa album." });
    }
};

module.exports = { getAllAlbum, getAlbumById, createAlbum, updateAlbum, deleteAlbum };
