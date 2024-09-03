-- AlterTable
ALTER TABLE `dicom` ADD COLUMN `review` ENUM('accept', 'pending', 'reject') NULL,
    ADD COLUMN `reviewBy` VARCHAR(191) NULL;
