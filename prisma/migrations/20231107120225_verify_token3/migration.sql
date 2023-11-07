/*
  Warnings:

  - You are about to drop the column `tokenId` on the `user` table. All the data in the column will be lost.

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

-- DropIndex
DROP INDEX `User_tokenId_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `tokenId`;

-- AlterTable
ALTER TABLE `verifytoken` ALTER COLUMN `expiration` DROP DEFAULT;

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
