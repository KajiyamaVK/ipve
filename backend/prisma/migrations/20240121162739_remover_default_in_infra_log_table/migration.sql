/*
  Warnings:

  - You are about to drop the column `description` on the `infraLogs` table. All the data in the column will be lost.
  - Added the required column `message` to the `infraLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `infraLogs` DROP COLUMN `description`,
    ADD COLUMN `message` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `people` ALTER COLUMN `createdAt` DROP DEFAULT;
