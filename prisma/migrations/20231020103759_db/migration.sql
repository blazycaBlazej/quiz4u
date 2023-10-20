-- DropIndex
DROP INDEX `Question_quizID_fkey` ON `question`;

-- AlterTable
ALTER TABLE `quiz` MODIFY `description` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quizID_fkey` FOREIGN KEY (`quizID`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
