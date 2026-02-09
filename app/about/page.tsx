import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About | BlogPlatform",
  description: "Learn more about our mission.",
};

const features = [
  "Built with Next.js 15 App Router",
  "React Server Components & Server Actions",
  "Beautiful Shadcn UI Components",
  "Framer Motion Animations",
  "Secure Authentication",
  "SEO Optimized by Default",
];

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">About the Platform</h1>
      <p className="text-xl text-muted-foreground mb-12">
        We are dedicated to providing the best blogging experience for developers and creators.
        Clean design, high performance, and robust features.
      </p>

      <div className="grid sm:grid-cols-2 gap-8 text-left mb-16">
        {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">{feature}</span>
            </div>
        ))}
      </div>

      <div className="bg-muted p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Ready to start writing?</h2>
        <p className="text-muted-foreground mb-6">Join our community of writers today.</p>
        <Button size="lg" asChild>
            <Link href="/admin/login">Log In to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
