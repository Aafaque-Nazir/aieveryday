"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { updatePost } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Tiptap from "@/components/tiptap";
import { Switch } from "@/components/ui/switch"; 

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Updating..." : "Update Post"}
    </Button>
  );
}

export default function EditPostForm({ post }: { post: any }) {
  const [state, dispatch, isPending] = useActionState(updatePost, { message: "" });
  const [content, setContent] = useState(post.content);

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={dispatch} className="space-y-6">
          <input type="hidden" name="id" value={post.id} />
          
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={post.title} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={post.slug} required />
          </div>
          
          <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Input id="excerpt" name="excerpt" defaultValue={post.excerpt || ""} />
          </div>

           <div className="grid gap-2">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input id="featuredImage" name="featuredImage" defaultValue={post.featuredImage || ""} />
          </div>

          <div className="flex items-center space-x-2">
              <Switch id="published" name="published" defaultChecked={post.published} />
              <Label htmlFor="published">Published</Label>
          </div>

          <div className="grid gap-2">
            <Label>Content</Label>
            <Tiptap value={content} onChange={setContent} />
            <input type="hidden" name="content" value={content} />
          </div>

          <div className="flex justify-end gap-4">
             <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
             <SubmitButton />
          </div>
           {state?.message && (
              <p className="text-red-500 text-sm mt-2">{state.message}</p>
           )}
        </form>
      </CardContent>
    </Card>
  );
}
