/*
  Warnings:

  - You are about to alter the column `Photo` on the `identificationsim` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `PhotoVerso` on the `identificationsim` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `PhotoRecto` on the `identificationsim` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- DropIndex
DROP INDEX `IdentificationSIM_CreatedBy_fkey` ON `identificationsim`;

-- DropIndex
DROP INDEX `RemplacementSIM_CreatedBy_fkey` ON `remplacementsim`;

-- DropIndex
DROP INDEX `Requete_CreatedBy_fkey` ON `requete`;

-- AlterTable
ALTER TABLE `identificationsim` MODIFY `DateEmPiece` VARCHAR(191) NOT NULL,
    MODIFY `DateExPiece` VARCHAR(191) NOT NULL,
    MODIFY `Photo` VARCHAR(191) NOT NULL,
    MODIFY `PhotoVerso` VARCHAR(191) NOT NULL,
    MODIFY `PhotoRecto` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `RemplacementSIM` ADD CONSTRAINT `RemplacementSIM_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `IdentificationSIM` ADD CONSTRAINT `IdentificationSIM_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Requete` ADD CONSTRAINT `Requete_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;
