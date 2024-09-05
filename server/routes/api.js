const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const soilController = require("../controllers/soilcontroller");
const authController = require("../controllers/authController");
const SoilData = require("../models/SoilData");


router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);

// Soil data routes
router.post('/soil-data', authMiddleware, [
  body('pH').isFloat({ min: 0, max: 14 }).withMessage('pH must be between 0 and 14'),
  body('nitrogen').isFloat({ min: 0 }).withMessage('Nitrogen must be a positive number'),
  body('phosphorus').isFloat({ min: 0 }).withMessage('Phosphorus must be a positive number'),
  body('potassium').isFloat({ min: 0 }).withMessage('Potassium must be a positive number'),
  body('organicMatter').isFloat({ min: 0 }).withMessage('Organic matter must be a positive number'),
  body('texture').isString().notEmpty().withMessage('Texture is required'),
], soilController.submitSoilData);

router.get('/soil-data', authMiddleware, soilController.getSoilData);
router.get('/analyze/:id', authMiddleware, soilController.analyzeSoilData);

// Expert-only routes
router.get('/expert/all-soil-data', authMiddleware, authorizeRoles('expert'), async (req, res) => {
  try {
    const allSoilData = await SoilData.find().populate('user', 'username email');
    res.json(allSoilData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;