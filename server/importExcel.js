// importExcel.js - อัปเดตข้อมูล RM จากไฟล์ Excel เข้า Database
const xlsx = require('xlsx');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. อ่านไฟล์ Excel
  const workbook = xlsx.readFile('./RM_1.xlsx'); // เปลี่ยนชื่อไฟล์ตามต้องการ
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  // 2. อัปเดตข้อมูล RM ใน Database
  for (const [i, item] of data.entries()) {
    await prisma.rM.upsert({
      where: { code: item.Code },
      update: {
        name: item.NAME,
        g_total: item['G-TOTAL'],
        order: i + 1 // ลำดับ row ใน Excel (เริ่มที่ 1)
      },
      create: {
        code: item.Code,
        name: item.NAME,
        g_total: item['G-TOTAL'],
        order: i + 1
      }
    });
  }
  console.log('Import complete');
}

main()
  .catch((err) => {
    console.error('Import error:', err);
  })
  .finally(() => prisma.$disconnect());