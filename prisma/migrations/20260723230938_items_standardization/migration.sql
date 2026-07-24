/*
  Warnings:

  - You are about to drop the `LinkItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TextItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LinkItem" DROP CONSTRAINT "LinkItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "TextItem" DROP CONSTRAINT "TextItem_itemId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "content" TEXT NOT NULL;

-- DropTable
DROP TABLE "LinkItem";

-- DropTable
DROP TABLE "TextItem";
