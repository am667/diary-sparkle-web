
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SettingsPage = () => {
  const navigate = useNavigate();

  // Get user from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  
  // Notification settings (these would be saved to a backend in a real app)
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [assignmentReminders, setAssignmentReminders] = useState(true);
  const [gradeAlerts, setGradeAlerts] = useState(true);
  
  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = { ...user, name, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Профиль успешно обновлен");
    }
  };
  
  const handleSaveNotifications = () => {
    toast.success("Настройки уведомлений сохранены");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Настройки</h1>
        <p className="text-muted-foreground">
          Управляйте своим профилем и настройками приложения
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Профиль</CardTitle>
            <CardDescription>
              Обновите информацию о своем профиле
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите свое имя"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Электронная почта</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите свою электронную почту"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Роль</Label>
              <Input
                id="role"
                value={user?.role === "teacher" ? "Учитель" : user?.role === "parent" ? "Родитель" : "Ученик"}
                disabled
              />
            </div>
            <Button 
              onClick={handleSaveProfile}
              className="bg-diary-primary hover:bg-diary-secondary w-full"
            >
              Сохранить изменения
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Уведомления</CardTitle>
            <CardDescription>
              Настройте свои уведомления
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Уведомления по электронной почте</Label>
                <p className="text-sm text-muted-foreground">
                  Получайте уведомления на свою электронную почту
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="assignment-reminders">Напоминания о заданиях</Label>
                <p className="text-sm text-muted-foreground">
                  Напоминания о сроках выполнения заданий
                </p>
              </div>
              <Switch
                id="assignment-reminders"
                checked={assignmentReminders}
                onCheckedChange={setAssignmentReminders}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="grade-alerts">Уведомления об оценках</Label>
                <p className="text-sm text-muted-foreground">
                  Получайте уведомления о новых оценках
                </p>
              </div>
              <Switch
                id="grade-alerts"
                checked={gradeAlerts}
                onCheckedChange={setGradeAlerts}
              />
            </div>
            
            <Button 
              onClick={handleSaveNotifications}
              className="bg-diary-primary hover:bg-diary-secondary w-full"
            >
              Сохранить настройки
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Безопасность</CardTitle>
          <CardDescription>
            Управляйте безопасностью своей учетной записи
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Текущий пароль</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Введите текущий пароль"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Новый пароль</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Введите новый пароль"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Подтвердите новый пароль</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Подтвердите новый пароль"
            />
          </div>
          <Button 
            onClick={() => toast.success("Пароль успешно изменен")}
            className="bg-diary-primary hover:bg-diary-secondary"
          >
            Изменить пароль
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
