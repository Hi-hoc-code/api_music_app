const Playlist = require('../models/Playlist');

const getAllPlaylist = async (req, res) => {
    try {
        const userId = req.params.userId;
        const playlists = await Playlist.find({ user: userId }).populate('user').populate('song');
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách playlist' });
    }
};


const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('user').populate('song');
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist không tồn tại' });
        }
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy playlist' });
    }
};

const createPlaylist = async (req, res) => {
    try {
        // Tạo mới playlist
        const newPlaylist = new Playlist({
            name: req.body.name,
            description: req.body.description,
            user: req.body.user,
            song: req.body.song,
            imgPlaylist: req.body.imgPlaylist,
        });

        const savedPlaylist = await newPlaylist.save();

        // Cập nhật vào user
        await User.findByIdAndUpdate(
            req.body.user,
            { $push: { playlist: savedPlaylist._id } }, 
            { new: true }
        );

        res.status(201).json(savedPlaylist);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo playlist' });
    }
};

const updatePlaylist = async (req, res) => {
    try {
        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                song: req.body.song,
                imgPlaylist: req.body.imgPlaylist,
            },
            { new: true }
        );
        if (!updatedPlaylist) {
            return res.status(404).json({ message: 'Playlist không tồn tại' });
        }
        res.status(200).json(updatedPlaylist);
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật playlist' });
    }
};

const deletePlaylist = async (req, res) => {
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
        if (!deletedPlaylist) {
            return res.status(404).json({ message: 'Playlist không tồn tại' });
        }
        res.status(200).json({ message: 'Đã xóa playlist thành công' });
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa playlist' });
    }
};

module.exports = { getAllPlaylist, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist };
