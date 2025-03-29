
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-diary-light to-white p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-diary-primary">Электронный Дневник</h1>
          <p className="mt-2 text-muted-foreground">
            Войдите в свою учетную запись
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
