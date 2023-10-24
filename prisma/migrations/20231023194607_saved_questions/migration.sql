/*
  Warnings:

  - You are about to drop the `savequestions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Question_quizID_fkey` ON `question`;

-- DropTable
DROP TABLE `savequestions`;

-- CreateTable
CREATE TABLE `SavedQuestions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` VARCHAR(191) NOT NULL,
    `questionID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SavedQuestions` ADD CONSTRAINT `SavedQuestions_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedQuestions` ADD CONSTRAINT `SavedQuestions_questionID_fkey` FOREIGN KEY (`questionID`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_quizID_fkey` FOREIGN KEY (`quizID`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
