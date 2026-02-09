import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
            console.log("Authorize called with:", credentials);
            const parsedCredentials = z
              .object({ email: z.string().email(), password: z.string().min(6) })
              .safeParse(credentials);
    
            if (parsedCredentials.success) {
              const { email, password } = parsedCredentials.data;
              
              const adminEmail = process.env.ADMIN_EMAIL;
              const adminPassword = process.env.ADMIN_PASSWORD;

              console.log("Checking against env:", adminEmail);

              if (email === adminEmail && password === adminPassword) {
                  console.log("Credentials match!");
                  
                  // Sync with Database to get valid ID
                  let user = await prisma.user.findUnique({
                      where: { email: adminEmail as string }
                  });

                  if (!user) {
                      console.log("Creating admin user in DB...");
                      const hashedPassword = await bcrypt.hash(adminPassword as string, 10);
                      user = await prisma.user.create({
                          data: {
                              email: adminEmail as string,
                              name: "Admin User",
                              password: hashedPassword,
                              role: "ADMIN"
                          }
                      });
                  }

                  return {
                      id: user.id,
                      email: user.email,
                      name: user.name,
                      role: user.role
                  };
              }
            }
            
            console.log("Invalid credentials or parsing failed");
            return null;
        },
    }),
  ],
})
