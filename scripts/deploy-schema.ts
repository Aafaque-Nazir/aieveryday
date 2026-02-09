import { createClient } from "@libsql/client";

const url = "https://blog-aafaque.aws-ap-south-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzA2NDI0NTcsImlkIjoiZGVlMTFiZDItNzI5NS00MWVlLWFjYmMtMTEzOTkxYmYzMGIyIiwicmlkIjoiZWFhYmM1MDItZjAwNy00MDVlLWIwYTgtYTNkZjZiMTY2ZDRlIn0.Dgnh_BsWqVxalvJ7BNw6FWn_S4GZnMbl7XxA8fBernnBgTrhr15vsvI_ZYKYUxhSLeNK8seMQX6mUVx6YyQyDQ";

const client = createClient({ url, authToken });

const sqlStatements = [
  `CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
  );`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");`,

  `CREATE TABLE IF NOT EXISTS "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "featuredImage" TEXT,
    "published" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
  );`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Post_slug_key" ON "Post"("slug");`,

  `CREATE TABLE IF NOT EXISTS "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
  );`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category"("name");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug");`,

  `CREATE TABLE IF NOT EXISTS "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
  );`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Tag_name_key" ON "Tag"("name");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Tag_slug_key" ON "Tag"("slug");`,

  `CREATE TABLE IF NOT EXISTS "_CategoryToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  );`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "_CategoryToPost_AB_unique" ON "_CategoryToPost"("A", "B");`,
  `CREATE INDEX IF NOT EXISTS "_CategoryToPost_B_index" ON "_CategoryToPost"("B");`,

  `CREATE TABLE IF NOT EXISTS "_PostToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  );`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");`,
  `CREATE INDEX IF NOT EXISTS "_PostToTag_B_index" ON "_PostToTag"("B");`
];

async function main() {
  console.log("Starting schema deployment to Turso...");

  try {
    for (let i = 0; i < sqlStatements.length; i++) {
      const stmt = sqlStatements[i];
      console.log(`[${i + 1}/${sqlStatements.length}] Executing...`);
      await client.execute(stmt);
      console.log("  OK");
    }
    console.log("Schema deployment completed successfully!");
  } catch (e: any) {
    console.error("Deployment FAILED!");
    console.error("Error:", e.message);
  } finally {
    client.close();
  }
}

main();
