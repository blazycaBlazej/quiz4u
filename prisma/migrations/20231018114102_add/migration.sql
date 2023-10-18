/*
  Warnings:

  - You are about to alter the column `correctAnswer` on the `question` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- DropIndex
DROP INDEX `Question_quizID_fkey` ON `question`;

-- AlterTable
ALTER TABLE `question` MODIFY `correctAnswer` ENUM('AnswerA', 'AnswerB', 'AnswerC', 'answerD') NOT NULL;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quizID_fkey` FOREIGN KEY (`quizID`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
