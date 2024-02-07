/*
  Warnings:

  - You are about to drop the column `name` on the `kinsLabels` table. All the data in the column will be lost.
  - Added the required column `nameA` to the `kinsLabels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameB` to the `kinsLabels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kinsLabels` DROP COLUMN `name`,
    ADD COLUMN `nameA` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameB` VARCHAR(191) NOT NULL;
