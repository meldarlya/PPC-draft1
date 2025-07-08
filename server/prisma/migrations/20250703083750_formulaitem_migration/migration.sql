/*
  Warnings:

  - You are about to drop the column `chemicalCode` on the `Formula` table. All the data in the column will be lost.
  - You are about to drop the column `qtyPerLot` on the `Formula` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Formula" DROP CONSTRAINT "Formula_chemicalCode_fkey";

-- AlterTable
ALTER TABLE "Formula" DROP COLUMN "chemicalCode",
DROP COLUMN "qtyPerLot",
ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "FormulaItem" (
    "id" SERIAL NOT NULL,
    "formulaId" INTEGER NOT NULL,
    "rmCode" TEXT NOT NULL,
    "qtyPerLot" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FormulaItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormulaItem" ADD CONSTRAINT "FormulaItem_formulaId_fkey" FOREIGN KEY ("formulaId") REFERENCES "Formula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormulaItem" ADD CONSTRAINT "FormulaItem_rmCode_fkey" FOREIGN KEY ("rmCode") REFERENCES "RM"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
