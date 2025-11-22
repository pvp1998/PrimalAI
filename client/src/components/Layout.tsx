import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-background relative flex flex-col">
        {children}
      </div>
    </div>
  );
}
