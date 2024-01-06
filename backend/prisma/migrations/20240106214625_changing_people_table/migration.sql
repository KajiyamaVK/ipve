/*
  Warnings:

  - The values [masculino,feminino] on the enum `people_gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `people` MODIFY `gender` ENUM('m', 'f') NOT NULL;
