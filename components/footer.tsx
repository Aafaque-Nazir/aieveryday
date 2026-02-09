"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
                B
              </div>
              <span className="font-bold text-xl tracking-tight">BlogPlatform</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A modern publishing platform for developers and creators. Built with performance and design in mind.
            </p>
            <div className="flex gap-4 mt-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link href="/coming-soon" className="hover:text-primary transition-colors">Documentation</Link>
              <Link href="/coming-soon" className="hover:text-primary transition-colors">Guides</Link>
              <Link href="/coming-soon" className="hover:text-primary transition-colors">Help Center</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/coming-soon" className="hover:text-primary transition-colors">About</Link>
              <Link href="/coming-soon" className="hover:text-primary transition-colors">Careers</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link href="/coming-soon" className="hover:text-primary transition-colors">Partners</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                placeholder="Enter your email" 
                type="email" 
                className="max-w-[200px] h-9 bg-background" 
              />
              <Button type="submit" size="sm" className="h-9">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} BlogPlatform. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/coming-soon" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/coming-soon" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/coming-soon" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
