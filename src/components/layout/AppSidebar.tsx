
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, GraduationCap, Home, PenSquare, Clipboard, Settings, LogOut } from "lucide-react";
import { toast } from "sonner";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userRole = user?.role || "student";
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Вы успешно вышли из системы");
    navigate("/login");
  };

  // Define menu items based on user role
  const studentMenuItems = [
    {
      title: "Главная",
      path: "/dashboard",
      icon: Home,
    },
    {
      title: "Расписание",
      path: "/schedule",
      icon: Calendar,
    },
    {
      title: "Задания",
      path: "/assignments",
      icon: BookOpen,
    },
    {
      title: "Оценки",
      path: "/grades",
      icon: GraduationCap,
    },
    {
      title: "Заметки",
      path: "/notes",
      icon: PenSquare,
    }
  ];
  
  const teacherMenuItems = [
    {
      title: "Главная",
      path: "/dashboard",
      icon: Home,
    },
    {
      title: "Расписание",
      path: "/schedule",
      icon: Calendar,
    },
    {
      title: "Задания",
      path: "/assignments",
      icon: BookOpen,
    },
    {
      title: "Журнал оценок",
      path: "/grades",
      icon: Clipboard,
    },
    {
      title: "Ученики",
      path: "/students",
      icon: GraduationCap,
    }
  ];
  
  const parentMenuItems = [
    {
      title: "Главная",
      path: "/dashboard",
      icon: Home,
    },
    {
      title: "Расписание",
      path: "/schedule",
      icon: Calendar,
    },
    {
      title: "Задания",
      path: "/assignments",
      icon: BookOpen,
    },
    {
      title: "Оценки",
      path: "/grades",
      icon: GraduationCap,
    },
    {
      title: "Сообщения",
      path: "/messages",
      icon: PenSquare,
    }
  ];
  
  const menuItems = 
    userRole === "teacher" ? teacherMenuItems : 
    userRole === "parent" ? parentMenuItems : 
    studentMenuItems;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-diary-primary" />
          <span className="font-bold text-lg">Электронный Дневник</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Меню</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    className={isActive(item.path) ? "bg-diary-light text-diary-primary" : ""}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Настройки</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/settings")}>
                  <Settings className="h-5 w-5 mr-2" />
                  <span>Настройки профиля</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Выйти</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
