/*
  Warnings:

  - You are about to drop the column `lables` on the `labelpreset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `labelpreset` DROP COLUMN `lables`,
    ADD COLUMN `labels` JSON NOT NULL;
