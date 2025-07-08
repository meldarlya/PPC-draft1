-- CreateTable
CREATE TABLE "ProductPlan" (
    "id" SERIAL NOT NULL,
    "colorCode" TEXT NOT NULL,
    "lot" TEXT NOT NULL,
    "percent" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "ProductPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPlanRM" (
    "id" SERIAL NOT NULL,
    "productPlanId" INTEGER NOT NULL,
    "rmCode" TEXT NOT NULL,
    "qtyUsed" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProductPlanRM_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductPlanRM" ADD CONSTRAINT "ProductPlanRM_productPlanId_fkey" FOREIGN KEY ("productPlanId") REFERENCES "ProductPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPlanRM" ADD CONSTRAINT "ProductPlanRM_rmCode_fkey" FOREIGN KEY ("rmCode") REFERENCES "RM"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
