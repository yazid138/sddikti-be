-- CreateTable
CREATE TABLE `m_users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `roleId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `m_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_roles` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `m_roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `m_categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_query_api` (
    `id` VARCHAR(191) NOT NULL,
    `api_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_auth_api_data` (
    `id` VARCHAR(191) NOT NULL,
    `auth_api_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_auth_api` (
    `id` VARCHAR(191) NOT NULL,
    `api_id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `m_auth_api_api_id_key`(`api_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_apis` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `author` VARCHAR(150) NULL,
    `description` VARCHAR(255) NULL,
    `status` ENUM('AKTIF', 'TIDAK_AKTIF') NOT NULL DEFAULT 'AKTIF',
    `created_by` VARCHAR(150) NULL,
    `updated_by` VARCHAR(150) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ApiToCategory` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ApiToCategory_AB_unique`(`A`, `B`),
    INDEX `_ApiToCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ApiToRole` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ApiToRole_AB_unique`(`A`, `B`),
    INDEX `_ApiToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `m_users` ADD CONSTRAINT `m_users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `m_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_query_api` ADD CONSTRAINT `m_query_api_api_id_fkey` FOREIGN KEY (`api_id`) REFERENCES `m_apis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_auth_api_data` ADD CONSTRAINT `m_auth_api_data_auth_api_id_fkey` FOREIGN KEY (`auth_api_id`) REFERENCES `m_auth_api`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_auth_api` ADD CONSTRAINT `m_auth_api_api_id_fkey` FOREIGN KEY (`api_id`) REFERENCES `m_apis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ApiToCategory` ADD CONSTRAINT `_ApiToCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `m_apis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ApiToCategory` ADD CONSTRAINT `_ApiToCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `m_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ApiToRole` ADD CONSTRAINT `_ApiToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `m_apis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ApiToRole` ADD CONSTRAINT `_ApiToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `m_roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
