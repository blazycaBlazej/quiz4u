/*
  Warnings:

  - You are about to drop the column `randomize40Questions` on the `quiz` table. All the data in the column will be lost.
  - Added the required column `randomize20Questions` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Question_quizID_fkey` ON `question`;

-- AlterTable
ALTER TABLE `question` MODIFY `question` TEXT NOT NULL,
    MODIFY `answerA` TEXT NOT NULL,
    MODIFY `answerB` TEXT NOT NULL,
    MODIFY `answerC` TEXT NOT NULL,
    MODIFY `answerD` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `quiz` DROP COLUMN `randomize40Questions`,
    ADD COLUMN `randomize20Questions` BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quizID_fkey` FOREIGN KEY (`quizID`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
