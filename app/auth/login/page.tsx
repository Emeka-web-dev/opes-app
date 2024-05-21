import { LoginForm } from "@/components/auth/login-form";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
