"use client";

import { useState, type ReactNode } from "react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-full overflow-hidden bg-background text-foreground transition-colors">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="grid h-full min-w-0 grid-rows-[auto,minmax(0,1fr),auto] overflow-hidden">
          <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

          <main className="min-h-0 overflow-y-auto bg-muted p-4 transition-colors lg:p-6">
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}