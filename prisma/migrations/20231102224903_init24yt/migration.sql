/*
  Warnings:

  - You are about to alter the column `solvedQuizData` on the `SavedQuiz` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.

*/
-- AlterTable
ALTER TABLE `SavedQuiz` MODIFY `solvedQuizData` JSON NOT NULL;
