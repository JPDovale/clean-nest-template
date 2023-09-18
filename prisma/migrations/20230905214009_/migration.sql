-- CreateEnum
CREATE TYPE "InformationType" AS ENUM ('FAKER', 'REAL');

-- CreateTable
CREATE TABLE "Information" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "information" TEXT NOT NULL,
    "information_type" "InformationType" NOT NULL DEFAULT 'FAKER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "table_id" TEXT
);

-- CreateTable
CREATE TABLE "tables" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "Information_id_key" ON "Information"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Information_name_key" ON "Information"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tables_id_key" ON "tables"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tables_name_key" ON "tables"("name");

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "tables"("id") ON DELETE SET NULL ON UPDATE CASCADE;
