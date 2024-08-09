-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NULL DEFAULT 'USER',

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dicom` (
    `id` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `studyDate` DATETIME(3) NOT NULL,
    `modality` VARCHAR(191) NOT NULL,
    `status` ENUM('annotated', 'unannotated') NULL DEFAULT 'unannotated',

    UNIQUE INDEX `Dicom_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Annotation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `annotatedBy` VARCHAR(191) NOT NULL,
    `annotatedAt` DATETIME(3) NOT NULL,
    `slices` JSON NOT NULL,
    `dicomId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Annotation` ADD CONSTRAINT `Annotation_annotatedBy_fkey` FOREIGN KEY (`annotatedBy`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Annotation` ADD CONSTRAINT `Annotation_dicomId_fkey` FOREIGN KEY (`dicomId`) REFERENCES `Dicom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
