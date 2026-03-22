-- DropIndex
DROP INDEX "User_email_key";

-- Create partial unique index (soft delete)
CREATE UNIQUE INDEX unique_active_email
ON "User"(email)
WHERE "deletedAt" IS NULL;