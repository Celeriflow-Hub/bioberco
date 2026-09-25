-- CreateEnum
CREATE TYPE "SightingStatus" AS ENUM ('PENDING_VALIDATION', 'VALIDATED', 'REJECTED', 'NEEDS_INFORMATION');

-- CreateTable
CREATE TABLE "Sighting" (
    "id" UUID NOT NULL,
    "protocol" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "photoStorageKey" TEXT,
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,
    "accuracyMeters" DECIMAL(8,2),
    "addressReference" TEXT NOT NULL,
    "observerName" TEXT NOT NULL,
    "observerPhone" TEXT NOT NULL,
    "observerEmail" TEXT NOT NULL,
    "consentAcceptedAt" TIMESTAMP(3) NOT NULL,
    "status" "SightingStatus" NOT NULL DEFAULT 'PENDING_VALIDATION',
    "internalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sighting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SightingForwarding" (
    "id" UUID NOT NULL,
    "sightingId" UUID NOT NULL,
    "institution" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "externalRef" TEXT,
    "errorMessage" TEXT,

    CONSTRAINT "SightingForwarding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sighting_protocol_key" ON "Sighting"("protocol");

-- CreateIndex
CREATE INDEX "Sighting_status_createdAt_idx" ON "Sighting"("status", "createdAt");

-- CreateIndex
CREATE INDEX "SightingForwarding_sightingId_idx" ON "SightingForwarding"("sightingId");

-- AddForeignKey
ALTER TABLE "SightingForwarding" ADD CONSTRAINT "SightingForwarding_sightingId_fkey" FOREIGN KEY ("sightingId") REFERENCES "Sighting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
