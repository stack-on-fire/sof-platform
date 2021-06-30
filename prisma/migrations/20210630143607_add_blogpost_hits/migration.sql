-- CreateTable
CREATE TABLE "blogpostHits" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogpostHits.ip_slug_unique" ON "blogpostHits"("ip", "slug");
