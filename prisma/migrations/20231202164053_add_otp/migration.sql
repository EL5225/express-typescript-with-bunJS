-- CreateTable
CREATE TABLE "Otp" (
    "id" INTEGER NOT NULL,
    "otp_code" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Otp_user_id_key" ON "Otp"("user_id");

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
