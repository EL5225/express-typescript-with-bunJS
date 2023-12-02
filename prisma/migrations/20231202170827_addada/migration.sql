/*
  Warnings:

  - You are about to alter the column `otp_code` on the `Otp` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "otp_code" SET DATA TYPE INTEGER,
ALTER COLUMN "exp" SET DATA TYPE BIGINT;
