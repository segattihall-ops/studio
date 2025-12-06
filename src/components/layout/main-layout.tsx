'use client';
import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  BarChart,
  HeartHandshake,
  ShieldCheck,
  Receipt,
  Gavel,
  FileClock,
  ScanEye,
  LifeBuoy,
  Settings,
  LogOut,
  Loader2,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppHeader from './header';
import { FirebaseClientProvider, useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';

const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/users', label: 'Users', icon: Users },
    { href: '/therapists', label: 'Therapists', icon: HeartHandshake },
    { href: '/verification', label: 'Verification', icon: ShieldCheck },
    { href: '/billing', label: 'Billing', icon: Receipt },
    { href: '/content', label: 'Content', icon: FileText },
    { href: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
    { href: '/seo', label: 'SEO', icon: BarChart },
    { href: '/legal', label: 'Legal', icon: Gavel },
    { href: '/logs', label: 'Logs', icon: FileClock },
    { href: '/moderation', label: 'Moderation', icon: ScanEye },
    { href: '/support', label: 'Support', icon: LifeBuoy },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading, userError } = useUser();
  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
  };

  React.useEffect(() => {
    // If loading is finished and there's no user, redirect to login
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
     // Handle auth errors, e.g. token expired.
    if(userError) {
        console.error("Auth error, redirecting to login:", userError);
        router.replace('/login');
    }

  }, [user, isUserLoading, userError, router]);

  // While checking user auth, show a full screen loader
  if (isUserLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If user is not logged in, render nothing (or a loader) until redirect happens.
  if (!user) {
    return null;
  }

  // User is authenticated, render the main application layout
  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-primary"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
            </svg>
            <h1 className="text-xl font-headline font-semibold">MasseurMatch</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 flex flex-col gap-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                        <LogOut />
                        <span>Logout</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  // The FirebaseClientProvider needs to wrap any component that uses Firebase hooks.
  // We conditionally render the protected layout or the public pages (like /login).
  return (
      <FirebaseClientProvider>
          {pathname === '/login' ? (
              children
          ) : (
              <ProtectedLayout>{children}</ProtectedLayout>
          )}
      </FirebaseClientProvider>
  )
};

export default MainLayout;
