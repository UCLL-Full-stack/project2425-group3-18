/*
  Warnings:

  - You are about to drop the column `kotId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_ProfileKoten` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[postId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationId]` on the table `Kot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `Kot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_kotId_fkey";

-- DropForeignKey
ALTER TABLE "_ProfileKoten" DROP CONSTRAINT "_ProfileKoten_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfileKoten" DROP CONSTRAINT "_ProfileKoten_B_fkey";

-- DropIndex
DROP INDEX "Location_kotId_key";

-- AlterTable
ALTER TABLE "Kot" ADD COLUMN     "locationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "kotId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userName",
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ProfileKoten";

-- CreateTable
CREATE TABLE "_KotToProfile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KotToProfile_AB_unique" ON "_KotToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_KotToProfile_B_index" ON "_KotToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_postId_key" ON "Comment"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_profileId_key" ON "Comment"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Kot_locationId_key" ON "Kot"("locationId");

-- AddForeignKey
ALTER TABLE "Kot" ADD CONSTRAINT "Kot_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KotToProfile" ADD CONSTRAINT "_KotToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Kot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KotToProfile" ADD CONSTRAINT "_KotToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
