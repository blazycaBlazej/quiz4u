/*
  Warnings:

  - You are about to drop the column `newslatter` on the `user` table. All the data in the column will be lost.
  - Added the required column `newsletter` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Question_quizID_fkey` ON `question`;

-- DropIndex
DROP INDEX `SavedQuestions_questionID_fkey` ON `savedquestions`;

-- DropIndex
DROP INDEX `SavedQuestions_quizID_fkey` ON `savedquestions`;

-- DropIndex
DROP INDEX `SavedQuestions_userID_fkey` ON `savedquestions`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `newslatter`,
    ADD COLUMN `newsletter` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `SavedQuiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` VARCHAR(191) NOT NULL,
    `quizName` VARCHAR(191) NOT NULL,
    `solvedQuizData` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
