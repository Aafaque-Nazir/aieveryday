import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  let post = null;
  
  // 1. Fetch the post first (Read operation)
  try {
    post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: { select: { name: true, image: true, role: true } },
        categories: { select: { name: true, slug: true } },
        tags: { select: { name: true, slug: true } },
      },
    });
  } catch (error) {
    console.error(`Error fetching post "${slug}":`, error);
    return null;
  }

  if (!post) return null;

  // 2. Try to increment views (Write operation) - Fire and forget
  try {
    await prisma.post.update({
      where: { slug },
      data: {
          views: {
              increment: 1
          }
      },
      select: { id: true } // Minimize data transfer
    });
  } catch (error) {
    // If update fails (e.g. stale client), just log it and don't block the page
    console.error(`Failed to increment views for "${slug}" (likely stale client):`, error);
  }

  return post;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | BlogPlatform`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  // Fallback for mock post if DB empty matches mock slug
  if (!post && slug === "future-web-dev-nextjs-15") {
      return (
         <div className="container py-12 md:py-24 max-w-4xl">
            <div className="text-center text-muted-foreground">
                <h1 className="text-3xl font-bold">Mock Post Demo</h1>
                <p>This post doesn't exist in the database yet. Run the seed script to populate data.</p>
                <Button asChild className="mt-4"><Link href="/blog">Back to Blog</Link></Button>
            </div>
         </div>
      )
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-12 md:py-24 max-w-4xl mx-auto">
      <ScrollProgress />
      <Button variant="ghost" size="sm" asChild className="mb-8 hover:-translate-x-1 transition-transform">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
      </Button>

      <div className="space-y-6 text-center mb-12">
        <div className="flex gap-2 justify-center">
            {post.categories.map((cat: { slug: string; name: string }) => (
                <Badge key={cat.slug} variant="secondary">{cat.name}</Badge>
            ))}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
        <div className="flex items-center justify-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {post.author.image ? <Image src={post.author.image} alt={post.author.name || "Author"} width={32} height={32} /> : <User className="h-4 w-4" />}
                </div>
                <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(post.createdAt), "MMMM d, yyyy")}</span>
            </div>
        </div>
      </div>

      {post.featuredImage && (
        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl mb-12">
            <img 
              src={post.featuredImage} 
              alt={post.title} 
              className="object-cover w-full h-full"
            />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert mx-auto">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="mt-12 pt-8 border-t flex gap-2 flex-wrap">
        <span className="font-semibold text-sm self-center mr-2">Tags:</span>
        {post.tags.map((tag: { slug: string; name: string }) => (
            <Badge key={tag.slug} variant="outline">#{tag.name}</Badge>
        ))}
      </div>
    </article>
  );
}
