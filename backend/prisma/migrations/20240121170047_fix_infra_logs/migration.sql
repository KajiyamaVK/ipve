-- AlterTable
ALTER TABLE `infraLogs` MODIFY `createdAt` DATETIME(3) NULL,
    MODIFY `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);