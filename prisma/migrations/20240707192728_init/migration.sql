-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CART', 'ORDERED', 'PROCESSING', 'READY', 'DELIVERING', 'DONE');

-- CreateTable
CREATE TABLE "Remedy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer_id" INTEGER NOT NULL,
    "form_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "photo" TEXT,

    CONSTRAINT "Remedy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formulation" (
    "id" SERIAL NOT NULL,
    "remedy_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "doze" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "Formulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pharmacies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "ratio" DOUBLE PRECISION NOT NULL,
    "work_hours" TEXT NOT NULL,

    CONSTRAINT "Pharmacies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prices" (
    "id" SERIAL NOT NULL,
    "remedy_id" INTEGER NOT NULL,
    "pharmacy_id" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "apart" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ordered" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "remedy_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "pharmacy_id" INTEGER NOT NULL,
    "prescription" TEXT,

    CONSTRAINT "Ordered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwd" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT,
    "street" TEXT,
    "house" TEXT,
    "apart" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Formulation_remedy_id_ingredient_id_key" ON "Formulation"("remedy_id", "ingredient_id");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_number_key" ON "Orders"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Remedy" ADD CONSTRAINT "Remedy_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remedy" ADD CONSTRAINT "Remedy_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remedy" ADD CONSTRAINT "Remedy_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formulation" ADD CONSTRAINT "Formulation_remedy_id_fkey" FOREIGN KEY ("remedy_id") REFERENCES "Remedy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formulation" ADD CONSTRAINT "Formulation_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prices" ADD CONSTRAINT "Prices_remedy_id_fkey" FOREIGN KEY ("remedy_id") REFERENCES "Remedy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prices" ADD CONSTRAINT "Prices_pharmacy_id_fkey" FOREIGN KEY ("pharmacy_id") REFERENCES "Pharmacies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordered" ADD CONSTRAINT "Ordered_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordered" ADD CONSTRAINT "Ordered_remedy_id_fkey" FOREIGN KEY ("remedy_id") REFERENCES "Remedy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordered" ADD CONSTRAINT "Ordered_pharmacy_id_fkey" FOREIGN KEY ("pharmacy_id") REFERENCES "Pharmacies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
