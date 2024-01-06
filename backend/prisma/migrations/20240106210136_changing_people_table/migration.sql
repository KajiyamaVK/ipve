/*
  Warnings:

  - You are about to alter the column `rolesId` on the `persons` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `persons` MODIFY `rolesId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `persons` ADD CONSTRAINT `persons_rolesId_fkey` FOREIGN KEY (`rolesId`) REFERENCES `peopleRoles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
