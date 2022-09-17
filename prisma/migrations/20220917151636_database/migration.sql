/*
  Warnings:

  - Added the required column `Description` to the `Requete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Motif` to the `Requete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Type` to the `Requete` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `IdentificationSIM_CreatedBy_fkey` ON `identificationsim`;

-- DropIndex
DROP INDEX `RemplacementSIM_CreatedBy_fkey` ON `remplacementsim`;

-- DropIndex
DROP INDEX `Requete_CreatedBy_fkey` ON `requete`;

-- AlterTable
ALTER TABLE `requete` ADD COLUMN `Description` VARCHAR(191) NOT NULL,
    ADD COLUMN `Motif` VARCHAR(191) NOT NULL,
    ADD COLUMN `Type` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `RemplacementSIM` ADD CONSTRAINT `RemplacementSIM_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `IdentificationSIM` ADD CONSTRAINT `IdentificationSIM_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Requete` ADD CONSTRAINT `Requete_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;
