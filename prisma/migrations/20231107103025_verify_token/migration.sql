/*
  Warnings:

  - A unique constraint covering the columns `[tokenId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updateddAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Question_quizID_fkey` ON `question`;

-- DropIndex
DROP INDEX `SavedQuestions_questionID_fkey` ON `savedquestions`;

-- DropIndex
DROP INDEX `SavedQuestions_quizID_fkey` ON `savedquestions`;

-- DropIndex
DROP INDEX `SavedQuestions_userID_fkey` ON `savedquestions`;

-- DropIndex
DROP INDEX `SavedQuiz_quizName_fkey` ON `savedquiz`;

-- DropIndex
DROP INDEX `SavedQuiz_userID_fkey` ON `savedquiz`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tokenId` INTEGER NULL,
    ADD COLUMN `updateddAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `VerifyToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `expiration` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `VerifyToken_token_key`(`token`),
    UNIQUE INDEX `VerifyToken_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_tokenId_key` ON `User`(`tokenId`);

-- AddForeignKey
ALTER TABLE `VerifyToken` ADD CONSTRAINT `VerifyToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedQuestions` ADD CONSTRAINT `SavedQuestions_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedQuestions` ADD CONSTRAINT `SavedQuestions_questionID_fkey` FOREIGN KEY (`questionID`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedQuestions` ADD CONSTRAINT `SavedQuestions_quizID_fkey` FOREIGN KEY (`quizID`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedQuiz` ADD CONSTRAINT `SavedQuiz_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedQuiz` ADD CONSTRAINT `SavedQuiz_quizName_fkey` FOREIGN KEY (`quizName`) REFERENCES `Quiz`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quizID_fkey` FOREIGN KEY (`quizID`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
