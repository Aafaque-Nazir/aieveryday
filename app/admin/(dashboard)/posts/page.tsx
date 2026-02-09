import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import { format } from "date-fns";
import { deletePost } from "@/lib/actions";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "@/components/ui/search";

type PostWithAuthor = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  views: number;
  createdAt: Date;
  author: { name: string | null };
};

export default async function AdminPostsPage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
    where: {
      title: {
        contains: query
      }
    }
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
         <Search placeholder="Search posts..." />
      </div>

      <div className="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {posts.map((post: PostWithAuthor) => (
                    <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>
                            <Badge variant={post.published ? "default" : "secondary"}>
                                {post.published ? "Published" : "Draft"}
                            </Badge>
                        </TableCell>
                        <TableCell>{post.views || 0}</TableCell>
                        <TableCell>{post.author.name}</TableCell>
                        <TableCell>{format(new Date(post.createdAt), "MMM d, yyyy")}</TableCell>
                        <TableCell className="text-right flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                                <Link href={`/blog/${post.slug}`} target="_blank">
                                    <Eye className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href={`/admin/posts/${post.id}/edit`}>
                                    <Edit className="h-4 w-4" />
                                </Link>
                            </Button>
                            <form action={deletePost.bind(null, post.id)}>
                                <Button variant="ghost" size="icon" className="text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </form>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </div>
    </div>
  );
}
