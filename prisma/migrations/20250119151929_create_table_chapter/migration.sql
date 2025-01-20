-- CreateTable
CREATE TABLE `chapters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chapter_number` INTEGER NOT NULL,
    `chapter_title` VARCHAR(100) NOT NULL,
    `release_date` DATETIME(3) NOT NULL,
    `page_count` INTEGER NOT NULL,
    `manga_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chapters` ADD CONSTRAINT `chapters_manga_id_fkey` FOREIGN KEY (`manga_id`) REFERENCES `manga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
