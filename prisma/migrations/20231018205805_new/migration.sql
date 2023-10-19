-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `newslatter` BOOLEAN NOT NULL,
    `isAdmin` BOOLEAN NOT NULL,

    UNIQUE INDEX `User_login_key`(`login`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `pathname` VARCHAR(191) NOT NULL,
    `isNew` BOOLEAN NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `randomize1Question` BOOLEAN NOT NULL,
    `randomize40Questions` BOOLEAN NOT NULL,
    `randomizeXQuestions` BOOLEAN NOT NULL,
    `rankedGame` BOOLEAN NOT NULL,
    `showAllQuestions` BOOLEAN NOT NULL,
    `printTest` BOOLEAN NOT NULL,
    `competeWithFriends` BOOLEAN NOT NULL,

    UNIQUE INDEX `Quiz_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `answerA` VARCHAR(191) NOT NULL,
    `answerB` VARCHAR(191) NOT NULL,
    `answerC` VARCHAR(191) NOT NULL,
    `answerD` VARCHAR(191) NOT NULL,
    `correctAnswer` ENUM('answerA', 'answerB', 'answerC', 'answerD') NOT NULL,
    `quizID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quizID_fkey` FOREIGN KEY (`quizID`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
