-- CreateTable
CREATE TABLE `User` (
    `Id` VARCHAR(191) NOT NULL,
    `Role` ENUM('ADMIN', 'CLIENT', 'AGENT') NOT NULL DEFAULT 'CLIENT',
    `Phone` VARCHAR(191) NOT NULL,
    `RelatedOtp` VARCHAR(191) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `IsActivated` BOOLEAN NOT NULL DEFAULT false,
    `UpdateBy` VARCHAR(191) NULL,
    `CreatedBy` VARCHAR(191) NULL,

    UNIQUE INDEX `User_Phone_key`(`Phone`),
    INDEX `numero_index`(`Phone`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `Id` VARCHAR(191) NOT NULL,
    `userId` CHAR(36) NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RemplacementSIM` (
    `Id` VARCHAR(191) NOT NULL,
    `Reference` VARCHAR(191) NOT NULL,
    `Motif` VARCHAR(191) NOT NULL,
    `DateNaisCli` VARCHAR(191) NOT NULL,
    `Localisation` VARCHAR(191) NULL,
    `NumMSISDN` VARCHAR(191) NOT NULL,
    `AncienICCID` VARCHAR(191) NULL,
    `NewICCID` VARCHAR(191) NOT NULL,
    `TypePiece` VARCHAR(191) NOT NULL,
    `NumPiece` VARCHAR(191) NOT NULL,
    `Statut` VARCHAR(191) NOT NULL DEFAULT 'En attente',
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `UpdateBy` VARCHAR(191) NULL,
    `CreatedBy` CHAR(36) NOT NULL,

    UNIQUE INDEX `RemplacementSIM_Reference_key`(`Reference`),
    INDEX `index_ref_remplacement`(`Reference`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IdentificationSIM` (
    `Id` VARCHAR(191) NOT NULL,
    `TelPrincipal` VARCHAR(191) NOT NULL,
    `TelSecondaire` VARCHAR(191) NOT NULL,
    `TypePiece` VARCHAR(191) NOT NULL,
    `NumPiece` VARCHAR(191) NOT NULL,
    `LieuPiece` VARCHAR(191) NOT NULL,
    `DateEmPiece` DATETIME(3) NOT NULL,
    `DateExPiece` DATETIME(3) NOT NULL,
    `CiviliteCli` VARCHAR(191) NOT NULL,
    `GenreCli` VARCHAR(191) NOT NULL,
    `NomCli` VARCHAR(191) NOT NULL,
    `PrenomCli` VARCHAR(191) NOT NULL,
    `LieuNaisCli` VARCHAR(191) NOT NULL,
    `DateNaisCli` VARCHAR(191) NOT NULL,
    `ProfCli` VARCHAR(191) NOT NULL,
    `AdrGeoCli` VARCHAR(191) NOT NULL,
    `Nationalite` VARCHAR(191) NOT NULL,
    `Photo` LONGBLOB NOT NULL,
    `PhotoVerso` LONGBLOB NOT NULL,
    `PhotoRecto` LONGBLOB NOT NULL,
    `AdrPostale` VARCHAR(191) NULL,
    `Pays` VARCHAR(191) NULL,
    `Statut` VARCHAR(191) NOT NULL DEFAULT 'En attente',
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `UpdateBy` VARCHAR(191) NULL,
    `CreatedBy` CHAR(36) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Requete` (
    `Id` VARCHAR(191) NOT NULL,
    `Statut` VARCHAR(191) NOT NULL DEFAULT 'En attente',
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `UpdateBy` VARCHAR(191) NULL,
    `CreatedBy` CHAR(36) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `RemplacementSIM` ADD CONSTRAINT `RemplacementSIM_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `IdentificationSIM` ADD CONSTRAINT `IdentificationSIM_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Requete` ADD CONSTRAINT `Requete_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;
