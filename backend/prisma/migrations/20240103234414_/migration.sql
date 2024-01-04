/*
  Warnings:

  - You are about to alter the column `formType` on the `screen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `screen` MODIFY `type` ENUM('parent', 'child', 'normal') NOT NULL,
    MODIFY `formType` ENUM('page', 'dialog', 'null') NULL;
