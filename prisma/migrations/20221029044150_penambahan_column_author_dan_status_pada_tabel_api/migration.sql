/*
  Warnings:

  - You are about to drop the column `categoryId` on the `api` table. All the data in the column will be lost.
  - Added the required column `author` to the `Api` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `api` DROP FOREIGN KEY `Api_categoryId_fkey`;

-- AlterTable
ALTER TABLE `api` DROP COLUMN `categoryId`,
    ADD COLUMN `author` VARCHAR(150) NOT NULL,
    ADD COLUMN `status` ENUM('aktif', 'tidakAktif') NOT NULL DEFAULT 'aktif';

-- CreateTable
CREATE TABLE `_ApiToCategory` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ApiToCategory_AB_unique`(`A`, `B`),
    INDEX `_ApiToCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ApiToCategory` ADD CONSTRAINT `_ApiToCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Api`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ApiToCategory` ADD CONSTRAINT `_ApiToCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
