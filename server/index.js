// server/index.js - จุดเริ่มต้น Express API สำหรับระบบวางแผนและสต๊อก
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const productPlanRoutes = require('./routes/productPlanRoutes');

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/product-plan', productPlanRoutes);

// ดึงข้อมูล RM ทั้งหมด
app.get('/api/rm', async (req, res) => {
  const rms = await prisma.rM.findMany();
  res.json(rms);
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port', PORT));