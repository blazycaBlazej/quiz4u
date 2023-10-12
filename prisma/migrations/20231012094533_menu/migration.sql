/*
  Warnings:

  - You are about to drop the column `requiresAuthentication` on the `menu` table. All the data in the column will be lost.
  - Added the required column `shouldDisplayWhenLoggedIn` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `requiresAuthentication`,
    ADD COLUMN `shouldDisplayWhenLoggedIn` BOOLEAN NOT NULL;
