const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const rms = [
  { code: "F001", name: "H-acid", g_total: 10000 },
  { code: "F002", name: "NaNO2", g_total: 8000 },
  { code: "F006", name: "PNA", g_total: 5000 },
  { code: "F108N", name: "LS-9", g_total: 2000 },
  { code: "F124", name: "SM-acid", g_total: 3000 },
  { code: "F120", name: "Resorcinol", g_total: 4000 },
  { code: "F129", name: "DS-100", g_total: 6000 },
  { code: "T001", name: "NaCl", g_total: 15000 },
  { code: "T011", name: "FFA", g_total: 2500 },
  { code: "T101", name: "Na₂CO₃", g_total: 12000 },
  { code: "T103", name: "35%HCl", g_total: 9000 },
  { code: "F103", name: "MPDA", g_total: 3500 },
  { code: "F126", name: "MTDA", g_total: 2000 },
  { code: "T102", name: "50%NaOH", g_total: 3000 },
  { code: "T082E", name: "Dedusting oil", g_total: 1000 }
  // ... เพิ่ม RM อื่นๆ ตามต้องการ ...
];

async function main() {
  for (const rm of rms) {
    await prisma.rM.upsert({
      where: { code: rm.code },
      update: rm,
      create: rm
    });
  }
  console.log('Import RM complete');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());