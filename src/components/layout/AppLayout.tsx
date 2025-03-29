
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { useToast } from "@/components/ui/use-toast";

const AppLayout = () => {
  const { toast } = useToast();
  
  // Check if user is logged in
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  
  if (!user) {
    // You could also show a toast here
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center mb-6">
              <SidebarTrigger className="mr-4" />
              <div>
                <h1 className="text-2xl font-bold">Электронный Дневник</h1>
                <p className="text-muted-foreground">
                  {user.role === "teacher" ? "Учитель" : 
                   user.role === "parent" ? "Родитель" : "Ученик"}
                </p>
              </div>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
