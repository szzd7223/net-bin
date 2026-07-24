/*
  Warnings:

  - You are about to drop the column `itemUrl` on the `Item` table. All the data in the column will be lost.
  - Added the required column `type` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('TEXT', 'LINK');

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "itemUrl",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" "ItemType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "TextItem" (
    "itemId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "TextItem_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "LinkItem" (
    "itemId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "LinkItem_pkey" PRIMARY KEY ("itemId")
);

-- AddForeignKey
ALTER TABLE "TextItem" ADD CONSTRAINT "TextItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkItem" ADD CONSTRAINT "LinkItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
