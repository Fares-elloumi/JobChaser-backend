/*
  Warnings:

  - You are about to drop the column `roleId` on the `job` table. All the data in the column will be lost.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `role` table. All the data in the column will be lost.
  - Added the required column `roleName` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_roleId_fkey`;

-- DropIndex
DROP INDEX `Job_roleId_fkey` ON `job`;

-- AlterTable
ALTER TABLE `job` DROP COLUMN `roleId`,
    ADD COLUMN `roleName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `role` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_roleName_fkey` FOREIGN KEY (`roleName`) REFERENCES `Role`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
