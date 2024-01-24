/*
  Warnings:

  - Added the required column `peopleIdFK` to the `infraLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `infraLogs` ADD COLUMN `peopleIdFK` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `people` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `infraLogs` ADD CONSTRAINT `infraLogs_peopleIdFK_fkey` FOREIGN KEY (`peopleIdFK`) REFERENCES `people`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
