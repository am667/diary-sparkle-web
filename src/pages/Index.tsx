
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, UserCheck, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 bg-gradient-to-br from-diary-light to-white p-8 md:p-16 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-diary-dark">
            Электронный Дневник
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-xl">
            Современная платформа для учеников, учителей и родителей. 
            Отслеживайте расписание, задания и оценки в одном месте.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => navigate("/login")}
              className="bg-diary-primary hover:bg-diary-secondary text-white px-8 py-6 rounded-md text-lg"
            >
              <UserCheck className="h-5 w-5 mr-2" />
              Войти
            </Button>
            <Button 
              onClick={() => navigate("/register")}
              variant="outline"
              className="border-diary-primary text-diary-primary hover:bg-diary-light px-8 py-6 rounded-md text-lg"
            >
              <Users className="h-5 w-5 mr-2" />
              Регистрация
            </Button>
          </div>
        </div>
        <div className="hidden md:flex md:flex-1 bg-diary-primary items-center justify-center p-16">
          <div className="max-w-md text-white">
            <BookOpen className="h-24 w-24 mb-8" />
            <h2 className="text-3xl font-bold mb-4">Доступ всегда и везде</h2>
            <p className="text-lg opacity-90">
              Электронный дневник доступен онлайн в любое время, с любого устройства. 
              Отслеживайте учебный процесс, где бы вы ни находились.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold">Для учеников</h3>
                <p className="mt-2 text-sm opacity-80">
                  Следите за расписанием, заданиями и оценками
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold">Для учителей</h3>
                <p className="mt-2 text-sm opacity-80">
                  Управляйте журналом оценок и заданиями
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold">Для родителей</h3>
                <p className="mt-2 text-sm opacity-80">
                  Будьте в курсе успеваемости вашего ребенка
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold">Простой интерфейс</h3>
                <p className="mt-2 text-sm opacity-80">
                  Легкий и понятный интерфейс для всех пользователей
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-diary-dark text-white py-4 px-8 text-center">
        <p>© 2023 Электронный Дневник. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default Index;
