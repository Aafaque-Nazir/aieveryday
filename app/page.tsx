import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: { select: { name: true, image: true } },
        categories: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();
  const displayPosts = posts;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 xl:py-40">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                <Sparkles className="mr-1 h-3 w-3" />
                <span>New Features Live</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                Welcome to the Future of Blogging
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover insights, tutorials, and trends in modern web development. Currently leveraging Next.js 15, React 19, and the power of AI.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 hover:-translate-y-1">
                  <Link href="/blog">
                    Start Reading <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mockup-code relative mx-auto aspect-video overflow-hidden rounded-xl border bg-background shadow-xl lg:order-last w-full max-w-lg lg:max-w-none bg-gradient-to-br from-primary/5 to-secondary/20 p-8 flex items-center justify-center">
               <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
               <div className="relative z-10 text-center space-y-2">
                  <div className="text-6xl font-black text-primary/20 select-none">BLOG</div>
                  <div className="text-xl font-medium text-foreground/60">Platform v1.0</div>
               </div>
               
               {/* Decorative circles */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container px-4 md:px-6 py-12 lg:py-24">
        <div className="flex flex-col gap-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Latest Articles</h2>
            <p className="text-muted-foreground">Fresh thoughts on technology and design.</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.length > 0 ? (
            displayPosts.map((post: any, idx: number) => (
              <PostCard key={post.slug} post={post} index={idx} />
            ))
          ) : (
             <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>No posts yet. Login to the admin dashboard to create one.</p>
             </div>
          )}
        </div>
        
        <div className="mt-12 flex justify-center">
             <Button variant="ghost" size="lg" asChild className="group">
                <Link href="/blog">
                    View All Posts
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
             </Button>
        </div>
      </section>
    </div>
  );
}
