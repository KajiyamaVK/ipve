/*
  Warnings:

  - You are about to drop the `infraLogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `infraLogs` DROP FOREIGN KEY `infraLogs_peopleIdFK_fkey`;

-- DropTable
DROP TABLE `infraLogs`;
