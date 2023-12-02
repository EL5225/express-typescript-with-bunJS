-- AlterTable
CREATE SEQUENCE otp_id_seq;
ALTER TABLE "Otp" ALTER COLUMN "id" SET DEFAULT nextval('otp_id_seq');
ALTER SEQUENCE otp_id_seq OWNED BY "Otp"."id";
