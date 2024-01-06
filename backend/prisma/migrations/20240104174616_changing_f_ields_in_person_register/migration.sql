/*
  Warnings:

  - You are about to drop the column `memberFirstName` on the `persons` table. All the data in the column will be lost.
  - You are about to drop the column `memberLastName` on the `persons` table. All the data in the column will be lost.
  - You are about to drop the column `memberTitleId` on the `persons` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `persons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleId` to the `persons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `persons` DROP FOREIGN KEY `persons_memberTitleId_fkey`;

-- AlterTable
ALTER TABLE `persons` DROP COLUMN `memberFirstName`,
    DROP COLUMN `memberLastName`,
    DROP COLUMN `memberTitleId`,
    ADD COLUMN `fullName` VARCHAR(191) NOT NULL,
    ADD COLUMN `titleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `persons` ADD CONSTRAINT `persons_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `peopleTitles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
