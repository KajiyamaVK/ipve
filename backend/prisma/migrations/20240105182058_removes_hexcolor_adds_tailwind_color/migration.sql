/*
  Warnings:

  - You are about to drop the column `hexColor` on the `peopleRoles` table. All the data in the column will be lost.
  - Added the required column `tailwindColor` to the `peopleRoles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peopleRoles` DROP COLUMN `hexColor`,
    ADD COLUMN `tailwindColor` VARCHAR(191) NOT NULL;
