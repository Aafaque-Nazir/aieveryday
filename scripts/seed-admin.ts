import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

const url = "https://blog-aafaque.aws-ap-south-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzA2NDI0NTcsImlkIjoiZGVlMTFiZDItNzI5NS00MWVlLWFjYmMtMTEzOTkxYmYzMGIyIiwicmlkIjoiZWFhYmM1MDItZjAwNy00MDVlLWIwYTgtYTNkZjZiMTY2ZDRlIn0.Dgnh_BsWqVxalvJ7BNw6FWn_S4GZnMbl7XxA8fBernnBgTrhr15vsvI_ZYKYUxhSLeNK8seMQX6mUVx6YyQyDQ";

const client = createClient({ url, authToken });

async function main() {
  console.log("Creating admin user in Turso...");

  const email = "aafaquesuper@gmail.com";
  const password = "aafaquesuper";
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = "admin-" + Date.now();
  const now = new Date().toISOString();

  try {
    await client.execute({
      sql: `INSERT INTO "User" ("id", "email", "password", "name", "role", "createdAt", "updatedAt") 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [id, email, hashedPassword, "Admin", "ADMIN", now, now]
    });
    console.log("Admin user created successfully!");
    console.log("User ID:", id);
    console.log("Email:", email);
  } catch (e: any) {
    if (e.message && e.message.includes("UNIQUE")) {
      console.log("Admin user already exists!");
    } else {
      console.error("Error:", e.message);
    }
  } finally {
    client.close();
  }
}

main();
