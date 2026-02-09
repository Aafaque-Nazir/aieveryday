import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  PlusCircle,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden w-64 flex-col border-r bg-muted/40 p-6 md:flex">
        <div className="flex items-center gap-2 font-bold text-xl mb-8">
            <LayoutDashboard className="h-6 w-6" />
            <span>Admin</span>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/posts">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              Posts
            </Button>
          </Link>
          <Link href="/admin/posts/new">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <PlusCircle className="h-4 w-4" />
              New Post
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
        <div className="mt-auto">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Mobile Header & Main Content */}
      <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link href="/admin" className="flex items-center gap-2 text-lg font-semibold">
                            <LayoutDashboard className="h-6 w-6" />
                            <span className="sr-only">Admin</span>
                        </Link>
                        <Link href="/admin" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                            <LayoutDashboard className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link href="/admin/posts" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                            <FileText className="h-5 w-5" />
                            Posts
                        </Link>
                         <Link href="/admin/posts/new" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                            <PlusCircle className="h-5 w-5" />
                            New Post
                        </Link>
                    </nav>
                     <div className="mt-auto">
                        <form
                            action={async () => {
                            "use server";
                            await signOut();
                            }}
                        >
                            <Button variant="outline" className="w-full justify-start gap-2 text-destructive">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                            </Button>
                        </form>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <span className="font-semibold">Admin Dashboard</span>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </div>
    </div>
  );
}
