const express = require('express');
const router = express.Router();
const productPlanController = require('../controllers/productPlanController');

// POST /api/product-plan
router.post('/', productPlanController.createProductPlan);

// GET /api/product-plan
router.get('/', productPlanController.getProductPlans);

// GET /api/product-plan/formula/:colorCode
router.get('/formula/:colorCode', productPlanController.getFormulaByColorCode);

module.exports = router;
