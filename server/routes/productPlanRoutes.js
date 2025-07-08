const express = require('express');
const router = express.Router();
const productPlanController = require('../controllers/productPlanController');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/product-plan
router.post('/', productPlanController.createProductPlan);

// GET /api/product-plan
router.get('/', productPlanController.getProductPlans);

// GET /api/product-plan/formula/:colorCode
router.get('/formula/:colorCode', productPlanController.getFormulaByColorCode);

// Example of using prisma to fetch data
router.get('/example', async (req, res) => {
  try {
    const rms = await prisma.rM.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(rms);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// GET /api/rm (เรียงลำดับตาม order)
router.get('/rm', async (req, res) => {
  try {
    const rms = await prisma.rM.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(rms);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching RM data.' });
  }
});

module.exports = router;
