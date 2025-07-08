const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const formulas = [
  { colorCode: "SL6200", chemicalCode: "F001", qtyPerLot: 808 },
  { colorCode: "SL6200", chemicalCode: "F002", qtyPerLot: 565 },
  { colorCode: "SL6200", chemicalCode: "F006", qtyPerLot: 363.5 },
  { colorCode: "SL6200", chemicalCode: "F108N", qtyPerLot: 3.5 },
  { colorCode: "SL6200", chemicalCode: "F124", qtyPerLot: 14 },
  { colorCode: "SL6200", chemicalCode: "F120", qtyPerLot: 264.7 },
  { colorCode: "SL6200", chemicalCode: "F129", qtyPerLot: 692.8 },
  { colorCode: "SL6200", chemicalCode: "T001", qtyPerLot: 6000 },
  { colorCode: "SL6200", chemicalCode: "T011", qtyPerLot: 22 },
  { colorCode: "SL6200", chemicalCode: "T101", qtyPerLot: 1537.5 },
  { colorCode: "SL6200", chemicalCode: "T103", qtyPerLot: 3112 },
  // ... เพิ่มสูตร SL92N0 ต่อไป ...
  { colorCode: "SL92N0", chemicalCode: "F001", qtyPerLot: 1308 },
  { colorCode: "SL92N0", chemicalCode: "F002", qtyPerLot: 919 },
  { colorCode: "SL92N0", chemicalCode: "F006", qtyPerLot: 530 },
  { colorCode: "SL92N0", chemicalCode: "F103", qtyPerLot: 225 },
  { colorCode: "SL92N0", chemicalCode: "F108N", qtyPerLot: 4 },
  { colorCode: "SL92N0", chemicalCode: "F124", qtyPerLot: 19 },
  { colorCode: "SL92N0", chemicalCode: "F126", qtyPerLot: 200 },
  { colorCode: "SL92N0", chemicalCode: "F129", qtyPerLot: 1149 },
  { colorCode: "SL92N0", chemicalCode: "T011", qtyPerLot: 31 },
  { colorCode: "SL92N0", chemicalCode: "T101", qtyPerLot: 2090 },
  { colorCode: "SL92N0", chemicalCode: "T102", qtyPerLot: 150 },
  { colorCode: "SL92N0", chemicalCode: "T103", qtyPerLot: 3193 },
  { colorCode: "SL92N0", chemicalCode: "T082E", qtyPerLot: 25 }
];

async function main() {
  await prisma.formula.deleteMany(); // ลบสูตรทั้งหมดก่อน import ใหม่
  // ดึง code RM ทั้งหมด
  const rmCodes = new Set((await prisma.rM.findMany({ select: { code: true } })).map(rm => rm.code));
  let skipped = 0;
  for (const f of formulas) {
    if (!rmCodes.has(f.chemicalCode)) {
      skipped++;
      console.log(`Skip: ${f.chemicalCode} ไม่มีใน RM`);
      continue;
    }
    await prisma.formula.create({ data: f });
  }
  console.log('Import formula complete. Skipped:', skipped);
}

async function getFormulaWithRM(colorCode) {
  const formulas = await prisma.formula.findMany({
    where: { colorCode },
    include: {
      rm: true // join RM เพื่อดึง name
    }
  });
  return formulas;
}

// ตัวอย่างการใช้งาน
getFormulaWithRM("SL6200").then(console.log);

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());