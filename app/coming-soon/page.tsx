"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground mb-8"
          >
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            <span>Work in Progress</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl"
          >
            Something <span className="text-primary">Extraordinary</span><br /> is Coming Soon.
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We are crafting a new experience. This page is currently under construction, 
            but we promise it will be worth the wait. Stay tuned for updates.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto w-full mb-12"
          >
            <div className="relative w-full">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-background/50 backdrop-blur-sm border-primary/20 focus-visible:ring-primary/30 h-12 pr-12"
              />
            </div>
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 font-semibold">
              Notify Me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
             <Button variant="ghost" asChild className="group">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Link>
             </Button>
          </motion.div>
        </motion.div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground z-10">
        © {new Date().getFullYear()} BlogPlatform. All rights reserved.
      </footer>
    </div>
  );
}
