/*
  Warnings:

  - You are about to drop the column `roleName` on the `job` table. All the data in the column will be lost.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `roleId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Role` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_roleName_fkey`;

-- DropIndex
DROP INDEX `Job_roleName_fkey` ON `job`;

-- AlterTable
ALTER TABLE `job` DROP COLUMN `roleName`,
    ADD COLUMN `roleId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `role` DROP PRIMARY KEY,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
