/*
  Warnings:

  - You are about to drop the column `password` on the `authapi` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `authapi` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `authapi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `authapi` DROP COLUMN `password`,
    DROP COLUMN `token`,
    DROP COLUMN `username`;

-- CreateTable
CREATE TABLE `AuthApiData` (
    `id` VARCHAR(191) NOT NULL,
    `authApiId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuthApiData` ADD CONSTRAINT `AuthApiData_authApiId_fkey` FOREIGN KEY (`authApiId`) REFERENCES `AuthApi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
