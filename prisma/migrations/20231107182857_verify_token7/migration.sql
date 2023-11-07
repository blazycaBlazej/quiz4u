/*
  Warnings:

  - You are about to drop the column `createdAt` on the `verifytoken` table. All the data in the column will be lost.
  - Added the required column `updateddAt` to the `VerifyToken` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE `verifytoken` DROP COLUMN `createdAt`,
    ADD COLUMN `updateddAt` DATETIME(3) NOT NULL;

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
