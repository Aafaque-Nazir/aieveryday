import { createClient } from "@libsql/client";

const url = "https://blog-aafaque.aws-ap-south-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzA2NDI0NTcsImlkIjoiZGVlMTFiZDItNzI5NS00MWVlLWFjYmMtMTEzOTkxYmYzMGIyIiwicmlkIjoiZWFhYmM1MDItZjAwNy00MDVlLWIwYTgtYTNkZjZiMTY2ZDRlIn0.Dgnh_BsWqVxalvJ7BNw6FWn_S4GZnMbl7XxA8fBernnBgTrhr15vsvI_ZYKYUxhSLeNK8seMQX6mUVx6YyQyDQ";

console.log("Database URL:", url);
console.log("Token Length:", authToken.length);

const client = createClient({
  url: url,
  authToken: authToken,
});

async function main() {
  try {
    console.log("Connecting to LibSQL...");
    const rs = await client.execute("SELECT 1");
    console.log("Connection SUCCESS!");
    console.log("Result:", JSON.stringify(rs));
  } catch (e: any) {
    console.error("Connection FAILED!");
    console.error("Error Name:", e.name);
    console.error("Error Message:", e.message);
    if (e.cause) console.error("Error Cause:", e.cause);
  } finally {
    client.close();
  }
}

main();
