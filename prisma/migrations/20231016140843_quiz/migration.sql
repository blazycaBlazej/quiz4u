/*
  Warnings:

  - Added the required column `pathname` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Question_quizID_fkey` ON `question`;

-- AlterTable
ALTER TABLE `quiz` ADD COLUMN `pathname` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quizID_fkey` FOREIGN KEY (`quizID`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
