"use client";

import { LoginForm } from "@/components/auth/login-form";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth/login");
  }, [router]);
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
