import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { FileText, Users, Eye } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const postCount = await prisma.post.count();
  const publishedCount = await prisma.post.count({ where: { published: true } });
  
  const totalViews = await prisma.post.aggregate({
      _sum: {
          views: true
      }
  });

  const views = totalViews._sum.views || 0;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postCount}</div>
            <p className="text-xs text-muted-foreground">
              {publishedCount} published
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all posts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Authors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Admin access only
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
             <RecentPosts />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

async function RecentPosts() {
  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } }
  });

  return (
    <div className="space-y-8">
      {recentPosts.map((post: { id: string; title: string; published: boolean; author: { name: string | null } }) => (
        <div key={post.id} className="flex items-center">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{post.title}</p>
            <p className="text-sm text-muted-foreground">
              {post.author.name}
            </p>
          </div>
          <div className="ml-auto font-medium">
             {post.published ? (
                <span className="text-green-500 text-xs">Published</span>
             ) : (
                <span className="text-yellow-500 text-xs">Draft</span>
             )}
          </div>
        </div>
      ))}
    </div>
  )
}
