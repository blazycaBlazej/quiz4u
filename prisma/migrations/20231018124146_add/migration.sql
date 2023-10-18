/*
  Warnings:

  - The values [AnswerA,AnswerB,AnswerC] on the enum `Question_correctAnswer` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropIndex
DROP INDEX `Question_quizID_fkey` ON `question`;

-- AlterTable
ALTER TABLE `question` MODIFY `correctAnswer` ENUM('answerA', 'answerB', 'answerC', 'answerD') NOT NULL;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quizID_fkey` FOREIGN KEY (`quizID`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
