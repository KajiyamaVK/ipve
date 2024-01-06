-- DropForeignKey
ALTER TABLE `persons` DROP FOREIGN KEY `persons_rolesId_fkey`;

-- AlterTable
ALTER TABLE `persons` MODIFY `rolesId` VARCHAR(191) NULL;
