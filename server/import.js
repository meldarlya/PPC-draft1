const { PrismaClient } = require('@prisma/client');
const xlsx = require('xlsx');
const prisma = new PrismaClient();

async function main() {
  // อ่านข้อมูล RM จากไฟล์ Excel โดยตรง (ไม่ใช้ JSON)
  const workbook = xlsx.readFile('../client/public/RM_1.xlsx'); // เปลี่ยน path ตามที่ไฟล์อยู่จริง
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);
  for (const item of data) {
    await prisma.rM.upsert({
      where: { code: item.Code },
      update: { g_total: item['G-TOTAL'] },
      create: { code: item.Code, g_total: item['G-TOTAL'] }
    });
  }
  console.log('Import complete');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());