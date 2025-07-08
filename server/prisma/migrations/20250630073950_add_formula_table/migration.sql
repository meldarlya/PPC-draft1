-- AlterTable
ALTER TABLE "RM" ADD COLUMN     "name" TEXT,
ALTER COLUMN "g_total" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Formula" (
    "id" SERIAL NOT NULL,
    "colorCode" TEXT NOT NULL,
    "chemicalCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qtyPerLot" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Formula_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Formula" ADD CONSTRAINT "Formula_chemicalCode_fkey" FOREIGN KEY ("chemicalCode") REFERENCES "RM"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
