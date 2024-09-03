-- AddForeignKey
ALTER TABLE `Dicom` ADD CONSTRAINT `Dicom_reviewBy_fkey` FOREIGN KEY (`reviewBy`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
