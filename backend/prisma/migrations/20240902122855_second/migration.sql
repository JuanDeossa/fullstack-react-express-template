-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
