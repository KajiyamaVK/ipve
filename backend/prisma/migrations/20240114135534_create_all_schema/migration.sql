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
    `tailwindColor` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `people` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `titleIdFK` INTEGER NOT NULL,
    `dateOfBirth` DATETIME(3) NULL,
    `gender` ENUM('m', 'f') NOT NULL,
    `address` VARCHAR(191) NULL,
    `complement` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `suburb` VARCHAR(191) NULL,
    `uf` VARCHAR(191) NULL,
    `cep` VARCHAR(191) NULL,
    `phone1` VARCHAR(191) NULL,
    `phone1IsWhatsapp` BOOLEAN NULL,
    `phone2` VARCHAR(191) NULL,
    `photoUrl` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peopleRolesData` (
    `peopleIdFK` INTEGER NOT NULL,
    `roleIdFK` INTEGER NOT NULL,

    PRIMARY KEY (`peopleIdFK`, `roleIdFK`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `churchBranches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `people` ADD CONSTRAINT `people_titleIdFK_fkey` FOREIGN KEY (`titleIdFK`) REFERENCES `peopleTitles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peopleRolesData` ADD CONSTRAINT `peopleRolesData_peopleIdFK_fkey` FOREIGN KEY (`peopleIdFK`) REFERENCES `people`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peopleRolesData` ADD CONSTRAINT `peopleRolesData_roleIdFK_fkey` FOREIGN KEY (`roleIdFK`) REFERENCES `peopleRoles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
