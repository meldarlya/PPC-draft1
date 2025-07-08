/*
  Warnings:

  - You are about to drop the `FormulaItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chemicalCode` to the `Formula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtyPerLot` to the `Formula` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Formula` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FormulaItem" DROP CONSTRAINT "FormulaItem_formulaId_fkey";

-- DropForeignKey
ALTER TABLE "FormulaItem" DROP CONSTRAINT "FormulaItem_rmCode_fkey";

-- AlterTable
ALTER TABLE "Formula" ADD COLUMN     "chemicalCode" TEXT NOT NULL,
ADD COLUMN     "qtyPerLot" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "FormulaItem";

-- AddForeignKey
ALTER TABLE "Formula" ADD CONSTRAINT "Formula_chemicalCode_fkey" FOREIGN KEY ("chemicalCode") REFERENCES "RM"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
