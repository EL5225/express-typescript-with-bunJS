-- CreateTable
CREATE TABLE "Employees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);
