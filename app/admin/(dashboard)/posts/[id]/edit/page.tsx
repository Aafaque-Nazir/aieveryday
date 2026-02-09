import prisma from "@/lib/prisma";
import EditPostForm from "./edit-form";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { tags: true }
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <EditPostForm post={post} />
    </div>
  );
}
