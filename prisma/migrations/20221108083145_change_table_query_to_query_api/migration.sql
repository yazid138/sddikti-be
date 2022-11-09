/*
  Warnings:

  - You are about to drop the `query` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `query` DROP FOREIGN KEY `Query_apiId_fkey`;

-- DropTable
DROP TABLE `query`;

-- CreateTable
CREATE TABLE `QueryApi` (
    `id` VARCHAR(191) NOT NULL,
    `apiId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QueryApi` ADD CONSTRAINT `QueryApi_apiId_fkey` FOREIGN KEY (`apiId`) REFERENCES `Api`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
