const express = require('express');
const dotenv = require('dotenv');

/*---------------------------------------*/
const userRoutes = require('./src/routes/userRoutes');
const albumRoutes = require('./src/routes/AlbumRoutes');
const artistRoutes = require('./src/routes/ArtistRoutes');
const genreRoutes = require('./src/routes/GenreRoutes');
const playlistRoutes = require('./src/routes/PlaylistRoutes');
const songRoutes = require('./src/routes/songRoutes');
const composeRoutes = require('./src/routes/ComposeRoutes');
const connectDB = require('./src/config/db');
/*---------------------------------------*/

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

/*---------------------------------------*/
app.use('/api/albums', albumRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/compose', composeRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/users', userRoutes);
/*---------------------------------------*/

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
