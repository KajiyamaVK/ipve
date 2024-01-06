/*
  Warnings:

  - You are about to drop the `persons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `persons` DROP FOREIGN KEY `persons_titleId_fkey`;

-- DropTable
DROP TABLE `persons`;

-- CreateTable
CREATE TABLE `people` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `titleId` INTEGER NOT NULL,
    `rolesId` VARCHAR(191) NULL,
    `dateOfBirth` DATETIME(3) NULL,
    `gender` ENUM('masculino', 'feminino') NOT NULL,
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `people` ADD CONSTRAINT `people_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `peopleTitles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
