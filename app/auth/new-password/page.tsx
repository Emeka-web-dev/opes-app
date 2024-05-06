"use client";

import { NewPasswordForm } from "@/components/auth/new-password-form";
import React, { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPasswordPage;
