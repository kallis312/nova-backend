/*
  Warnings:

  - You are about to drop the `label` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creator` to the `LabelPreset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `label` DROP FOREIGN KEY `Label_prestId_fkey`;

-- AlterTable
ALTER TABLE `labelpreset` ADD COLUMN `creator` VARCHAR(191) NOT NULL,
    ADD COLUMN `lables` JSON NOT NULL;

-- DropTable
DROP TABLE `label`;

-- AddForeignKey
ALTER TABLE `LabelPreset` ADD CONSTRAINT `LabelPreset_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
