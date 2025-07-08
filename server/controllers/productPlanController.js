// controllers/productPlanController.js - จัดการ Product Plan และสูตร
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/product-plan
exports.createProductPlan = async (req, res) => {
  const { department, colorCode, lot, date, percent, chemicals } = req.body;
  try {
    // 1. สร้าง ProductPlan และ ProductPlanRM
    const plan = await prisma.productPlan.create({
      data: {
        department,
        colorCode,
        lot,
        date: new Date(date),
        percent: parseFloat(percent),
        rms: {
          create: chemicals.map(c => ({
            rmCode: c.chemicalCode,
            qtyUsed: parseFloat(c.chemicalUse)
          }))
        }
      }
    });

    // 2. อัปเดต stock จริงใน RM (รวม in, out, chemicalUse)
    for (const c of chemicals) {
      const inVal = parseFloat(c.in) || 0;
      const outVal = parseFloat(c.out) || 0;
      const useVal = parseFloat(c.chemicalUse) || 0;
      const delta = inVal - outVal - useVal;
      await prisma.rM.update({
        where: { code: c.chemicalCode },
        data: {
          g_total: { increment: delta }
        }
      });
    }

    res.json({ success: true, plan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/product-plan (ดึงประวัติแผน)
exports.getProductPlans = async (req, res) => {
  try {
    const plans = await prisma.productPlan.findMany({
      include: { rms: true }
    });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/product-plan/formula/:colorCode (ดึงสูตรตาม colorCode)
exports.getFormulaByColorCode = async (req, res) => {
  const { colorCode } = req.params;
  try {
    // ดึงสูตรทั้งหมดที่ตรงกับ colorCode และ join ตาราง RM เพื่อดึง name
    const formulas = await prisma.formula.findMany({
      where: { colorCode },
      orderBy: { id: 'asc' },
      include: { rm: true }
    });
    res.json(formulas.map(f => ({
      chemicalCode: f.chemicalCode,
      qtyPerLot: f.qtyPerLot,
      name: f.rm?.name || '',
      // เพิ่ม field อื่น ๆ ตามต้องการ
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
