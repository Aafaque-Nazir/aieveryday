"use client";

import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User as UserIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: {
    title: string;
    excerpt: string | null;
    slug: string;
    createdAt: Date;
    author: {
      name: string | null;
    };
    categories: {
      name: string;
      slug: string;
    }[];
    featuredImage: string | null;
  };
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="h-full overflow-hidden border-border bg-card transition-all hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary group">
          <div className="relative aspect-video overflow-hidden bg-muted">
             {post.featuredImage ? (
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
                />
             ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground/20">
                    <span className="text-4xl font-bold">No Image</span>
                </div>
             )}
             <div className="absolute top-2 left-2 flex gap-2">
                {post.categories.map(cat => (
                    <Badge key={cat.slug} variant="secondary" className="backdrop-blur-md bg-background/80">
                        {cat.name}
                    </Badge>
                ))}
             </div>
          </div>
          <CardHeader>
            <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3 text-sm">
              {post.excerpt || "No excerpt available."}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center text-xs text-muted-foreground mt-auto">
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <UserIcon className="w-3 h-3" />
                    <span>{post.author.name || "Anonymous"}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                </div>
             </div>
             <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
