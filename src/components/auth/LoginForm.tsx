
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is a mock login - in a real app you would call an API
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("user", JSON.stringify({ email, role: "student" }));
      toast.success("Вход выполнен успешно!");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Вход в систему</CardTitle>
        <CardDescription className="text-center">
          Введите свои учетные данные для доступа к дневнику
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Электронная почта
            </label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="diary-input"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Пароль
              </label>
              <a href="#" className="text-sm text-diary-primary hover:underline">
                Забыли пароль?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="diary-input"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-diary-primary hover:bg-diary-secondary" 
            disabled={isLoading}
          >
            {isLoading ? "Вход..." : "Войти"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Нет аккаунта?{" "}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
            className="text-diary-primary hover:underline"
          >
            Зарегистрироваться
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
