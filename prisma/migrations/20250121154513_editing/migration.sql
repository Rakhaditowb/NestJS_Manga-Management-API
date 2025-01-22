/*
  Warnings:

  - Made the column `author` on table `manga` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `manga` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `chapters` MODIFY `release_date` DATE NOT NULL;

-- AlterTable
ALTER TABLE `manga` MODIFY `author` VARCHAR(100) NOT NULL,
    MODIFY `release_date` DATE NOT NULL,
    MODIFY `status` VARCHAR(20) NOT NULL;
