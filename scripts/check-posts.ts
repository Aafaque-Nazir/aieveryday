
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import * as dotenv from 'dotenv'

dotenv.config()

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Checking posts...");
  // Try to update the specific post that is failing
  const slug = "welcome-to-my-blog";
  try {
      const post = await prisma.post.update({
          where: { slug },
          data: {
              views: {
                  increment: 1
              }
          }
      });
      console.log(`Successfully updated post: ${post.title}, Views: ${post.views}`);
  } catch (error) {
      console.error("Failed to update post:", error);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
