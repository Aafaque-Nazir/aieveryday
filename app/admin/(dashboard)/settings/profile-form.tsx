"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateProfile } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

export function ProfileForm({ user }: { user: any }) {
  const [state, dispatch] = useActionState(updateProfile, null);

  return (
    <form action={dispatch} className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>{user.name?.charAt(0) || "A"}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
            <h3 className="font-medium">Profile Picture</h3>
            <p className="text-sm text-muted-foreground">
                Enter a URL for your profile picture.
            </p>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" name="image" defaultValue={user.image || ""} placeholder="https://..." />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={user.name || ""} required />
      </div>

      <div className="grid gap-2">
         <Label htmlFor="email">Email</Label>
         <Input id="email" name="email" defaultValue={user.email} disabled className="bg-muted" />
         <p className="text-xs text-muted-foreground">Email is managed via environment variables.</p>
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
      
      {state?.message && (
        <p className={state.message.includes("success") ? "text-green-500" : "text-red-500"}>
            {state.message}
        </p>
      )}
    </form>
  );
}
