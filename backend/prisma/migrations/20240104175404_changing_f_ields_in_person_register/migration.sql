/*
  Warnings:

  - Added the required column `gender` to the `persons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `persons` ADD COLUMN `gender` ENUM('masculino', 'feminino') NOT NULL;
