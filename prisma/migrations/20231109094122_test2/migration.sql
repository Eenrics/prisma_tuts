/*
  Warnings:

  - You are about to drop the column `userId` on the `UserPreference` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userPreferneceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `age` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_userId_fkey";

-- DropIndex
DROP INDEX "UserPreference_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userPreferneceId" TEXT,
ALTER COLUMN "age" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "User_userPreferneceId_key" ON "User"("userPreferneceId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPreferneceId_fkey" FOREIGN KEY ("userPreferneceId") REFERENCES "UserPreference"("id") ON DELETE SET NULL ON UPDATE CASCADE;
