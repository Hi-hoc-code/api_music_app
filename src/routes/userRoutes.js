const express = require('express');
const {
    register,
    login,
    forgotPassword,
    resetPassword,
    upPremium,
    getUserOtp,
    updateUserImage
} = require('../controllers/UserControllers');
const auth = require('../middlewares/auth');
const router = express.Router();
const upload = require('../middlewares/multer')
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/get-otp', getUserOtp);
router.put('/upgrade-premium', upPremium);
router.post('/update-image', upload.single('image'), updateUserImage);
module.exports = router;




// /api/users/register
// /api/users/login
// /api/users/forgot-password
// /api/users/get-otp
// /api/users/reset-password
// /api/users/update-image
// /api/users/upgrade-premium