import prisma from "@/lib/prisma";
import { PostCard } from "@/components/post-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const metadata = {
  title: "Blog | BlogPlatform",
  description: "Read our latest articles and insights.",
};

export const dynamic = 'force-dynamic';

async function getPosts(search?: string) {
  const where: any = { published: true };
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { content: { contains: search } },
    ];
  }

  try {
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: { select: { name: true, image: true } },
        categories: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
    const params = await searchParams;
    const query = params.q || "";
    const posts = await getPosts(query);

    // Mock data if database empty (demo mode)
    const displayPosts = posts.length > 0 ? posts : []; // Use empty array to trigger no results state if real DB is empty
    // Actually, let's show mocks if query is empty and posts are empty, to not show blank page on first run
    const finalPosts = (displayPosts.length === 0 && !query) ? [
        {
          id: "mock-1",
          title: "The Future of Web Development with Next.js 15",
          slug: "future-web-dev-nextjs-15",
          excerpt: "Explore the groundbreaking features of Next.js 15...",
          content: "",
          featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
          createdAt: new Date(),
          published: true,
          authorId: "1",
          author: { name: "Alex Code", image: null },
          categories: [{ name: "Tech", slug: "tech" }],
          tags: [],
        },
        // ... duplicates for grid
    ] : displayPosts;


  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Our Blog</h1>
        <p className="text-xl text-muted-foreground max-w-[800px]">
          Thoughts, stories, and ideas from the team.
        </p>
        
        <div className="w-full max-w-md mt-6 relative">
          <form action="/blog" method="GET" className="flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                name="q"
                type="search"
                placeholder="Search articles..."
                className="pl-9 w-full rounded-full bg-background"
                defaultValue={query}
                />
            </div>
            <Button type="submit" className="rounded-full">Search</Button>
          </form>
        </div>
      </div>

      {finalPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {finalPosts.map((post: any, idx: number) => (
            //@ts-ignore
            <PostCard key={post.slug} post={post} index={idx} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <h3 className="text-xl font-semibold">No posts found</h3>
          <p>Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}
