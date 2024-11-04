const Genre = require('../models/Genre');
const cloudinary = require('../config/cloudinary');

const getAllGenre = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving genres' });
  }
};

const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ message: 'Genre not found' });
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving genre' });
  }
};

const createGenre = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Kiểm tra nếu thể loại đã tồn tại
    const existingGenre = await Genre.findOne({ name });
    if (existingGenre) {
      return res.status(400).json({ message: 'Thể loại đã tồn tại.' });
    }

    // Kiểm tra nếu có file được tải lên
    if (!req.file) {
      return res.status(400).json({ message: "Thiếu file ảnh cho thể loại." });
    }

    // Tải lên ảnh qua Cloudinary nếu không tồn tại
    const result = await cloudinary.uploader.upload(req.file.path);

    // Tạo thể loại mới
    const newGenre = new Genre({
      name,
      description,
      imgGenre: result.secure_url,
    });

    await newGenre.save();
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ message: 'Error creating genre: ' + error.message });
    console.log(error);
  }
};



const updateGenre = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updateData = { name, description };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.imgGenre = result.secure_url;
    }

    const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedGenre) return res.status(404).json({ message: 'Genre not found' });

    res.status(200).json(updatedGenre);
  } catch (error) {
    res.status(500).json({ message: 'Error updating genre' });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    if (!deletedGenre) return res.status(404).json({ message: 'Genre not found' });

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting genre' });
  }
};

module.exports = { getAllGenre, getGenreById, createGenre, updateGenre, deleteGenre };
