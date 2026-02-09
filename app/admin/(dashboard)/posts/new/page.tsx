"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { createPost } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Tiptap from "@/components/tiptap";
import { Switch } from "@/components/ui/switch"; 

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Create Post"}
    </Button>
  );
}

export default function NewPostPage() {
  const [state, dispatch, isPending] = useActionState(createPost, { message: "" });
  const [content, setContent] = useState("");

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Enter post title" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" placeholder="custom-slug-url" required />
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Input id="excerpt" name="excerpt" placeholder="Short description for SEO and previews" />
            </div>

             <div className="grid gap-2">
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <Input id="featuredImage" name="featuredImage" placeholder="https://example.com/image.jpg" />
            </div>

            <div className="flex items-center space-x-2">
                <Switch id="published" name="published" />
                <Label htmlFor="published">Publish immediately</Label>
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
    </div>
  );
}
