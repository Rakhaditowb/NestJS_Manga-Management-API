-- DropForeignKey
ALTER TABLE `manga` DROP FOREIGN KEY `manga_username_fkey`;

-- DropIndex
DROP INDEX `manga_username_fkey` ON `manga`;

-- AddForeignKey
ALTER TABLE `manga` ADD CONSTRAINT `manga_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
