"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, Moon, Sun, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 20 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
              B
            </div>
          </motion.div>
          <span className="font-bold text-xl tracking-tight">BlogPlatform</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative group",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 top-full block h-[2px] w-full bg-primary mt-1"
                />
              )}
            </Link>
          ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-4"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
{/* <Button asChild size="sm">
                <Link href="/admin/login">Admin</Link>
             </Button> */}
        </nav>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-4">
             <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
               <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-2 border-primary/20">
              <div className="flex flex-col h-full">
                <div className="flex flex-col gap-4 py-6 border-b">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2 px-2">
                      <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
                        B
                      </div>
                      <span className="font-bold text-xl tracking-tight">BlogPlatform</span>
                    </Link>
                  </SheetClose>
                  <p className="text-sm text-muted-foreground px-2">
                    Modern stories for modern developers.
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  {links.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3 text-lg font-medium rounded-md transition-all",
                          "hover:bg-accent hover:text-accent-foreground",
                          pathname === link.href
                            ? "bg-primary/10 text-primary border-l-4 border-primary font-bold"
                            : "text-foreground/80"
                        )}
                      >
                        {link.label === "Home" && <Laptop className="h-5 w-5" />}
                        {link.label === "Blog" && <Laptop className="h-5 w-5" />}
                        {link.label}
                        <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <div className="mt-auto py-6 border-t">
                   <div className="flex flex-col items-center justify-center gap-4 text-center">
                      <p className="text-xs text-muted-foreground w-3/4">
                        &copy; {new Date().getFullYear()} BlogPlatform. All rights reserved.
                      </p>
                   </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
