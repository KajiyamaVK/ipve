/*
  Warnings:

  - You are about to drop the `screen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `screen`;

-- CreateTable
CREATE TABLE `screens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `menuLabel` VARCHAR(191) NOT NULL,
    `type` ENUM('parent', 'child', 'normal') NOT NULL,
    `order` INTEGER NOT NULL,
    `icon` VARCHAR(191) NULL,
    `formType` ENUM('page', 'dialog', 'null') NULL,
    `parentId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peopleTitles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peopleRoles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `hexColor` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `persons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberFirstName` VARCHAR(191) NOT NULL,
    `memberLastName` VARCHAR(191) NOT NULL,
    `memberTitleId` INTEGER NOT NULL,
    `rolesId` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NULL,
    `address` VARCHAR(191) NULL,
    `complement` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `suburb` VARCHAR(191) NULL,
    `uf` VARCHAR(191) NULL,
    `cep` VARCHAR(191) NULL,
    `phones1` VARCHAR(191) NULL,
    `phone1IsWhatsapp` BOOLEAN NULL,
    `phone2` VARCHAR(191) NULL,
    `photoUrl` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `persons` ADD CONSTRAINT `persons_memberTitleId_fkey` FOREIGN KEY (`memberTitleId`) REFERENCES `peopleTitles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
