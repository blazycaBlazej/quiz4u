-- CreateTable
CREATE TABLE `Menu` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `isNew` BOOLEAN NOT NULL,
    `pathname` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `requiresAuthentication` BOOLEAN NOT NULL,

    UNIQUE INDEX `Menu_name_key`(`name`),
    UNIQUE INDEX `Menu_pathname_key`(`pathname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
