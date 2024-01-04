/*
  Warnings:

  - You are about to drop the `Screen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Screen` DROP FOREIGN KEY `Screen_parentId_fkey`;

-- DropTable
DROP TABLE `Screen`;

-- CreateTable
CREATE TABLE `screen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `menuLabel` VARCHAR(191) NOT NULL,
    `type` ENUM('parent', 'child') NOT NULL,
    `order` INTEGER NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `formType` VARCHAR(191) NOT NULL,
    `parentId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `screen` ADD CONSTRAINT `screen_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `screen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
