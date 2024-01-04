-- CreateTable
CREATE TABLE `Screen` (
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
ALTER TABLE `Screen` ADD CONSTRAINT `Screen_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Screen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
