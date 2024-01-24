/*
  Warnings:

  - Made the column `createdAt` on table `infraLogs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `infraLogs` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `peopleRolesData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `infraLogs` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `people` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `peopleRolesData` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
