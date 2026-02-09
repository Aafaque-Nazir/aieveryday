'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log("Attempting sign in...");
    await signIn('credentials', formData);
    console.log("Sign in successful (should redirect)");
  } catch (error) {
    console.error("Sign in error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

import { auth } from '@/auth';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  published: z.string().optional(),
});

export async function createPost(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Not authenticated" };
  }

  const validatedFields = FormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    excerpt: formData.get("excerpt"),
    featuredImage: formData.get("featuredImage"),
    published: formData.get("published"),
  });

  if (!validatedFields.success) {
    return {
      message: "Missing Fields. Failed to Create Post.",
    };
  }

  const { title, slug, content, excerpt, featuredImage, published } = validatedFields.data;

  try {
    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        featuredImage: featuredImage || null,
        published: published === "on",
        authorId: session.user.id,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Post.",
    };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePost(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Not authenticated" };
  }

  const id = formData.get("id") as string;
  const validatedFields = FormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    excerpt: formData.get("excerpt"),
    featuredImage: formData.get("featuredImage"),
    published: formData.get("published"),
  });

  if (!validatedFields.success) {
    return {
      message: "Missing Fields. Failed to Update Post.",
    };
  }

  const { title, slug, content, excerpt, featuredImage, published } = validatedFields.data;

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        featuredImage: featuredImage || null,
        published: published === "on",
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Post.",
    };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
    const session = await auth();
    if (!session?.user) return; // Return void to satisfy type
    
    try {
        await prisma.post.delete({
            where: { id }
        });
        revalidatePath("/blog");
        revalidatePath("/admin/posts");
    } catch (error) {
        console.error("Failed to delete post:", error);
    }
}

const ProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email().optional(), // Read-only mostly but good for validation if we allow change
  image: z.string().url().optional().or(z.literal("")),
});

export async function updateProfile(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Not authenticated" };
  }

  const validatedFields = ProfileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid Fields. Failed to Update Profile.",
    };
  }

  const { name, image } = validatedFields.data;

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        image: image || null,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Profile.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  return { message: "Profile updated successfully." };
}
