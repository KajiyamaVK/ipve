/*
  Warnings:

  - You are about to drop the `testTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `screen` DROP FOREIGN KEY `screen_parentId_fkey`;

-- DropTable
DROP TABLE `testTable`;
