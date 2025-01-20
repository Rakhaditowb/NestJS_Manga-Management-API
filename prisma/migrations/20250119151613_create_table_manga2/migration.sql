/*
  Warnings:

  - You are about to drop the column `email` on the `manga` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `manga` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `manga` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `manga` table. All the data in the column will be lost.
  - Added the required column `release_date` to the `manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `manga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `manga` DROP COLUMN `email`,
    DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    DROP COLUMN `phone`,
    ADD COLUMN `author` VARCHAR(100) NULL,
    ADD COLUMN `release_date` DATETIME(3) NOT NULL,
    ADD COLUMN `status` VARCHAR(20) NULL,
    ADD COLUMN `title` VARCHAR(100) NOT NULL;
