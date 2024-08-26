/*
  Warnings:

  - The values [accept,reject] on the enum `Dicom_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `dicom` MODIFY `status` ENUM('unannotated', 'annotated') NULL DEFAULT 'unannotated';
