"use client";
import { NewVerificationForm } from "@/components/auth/new-verification-form";
import React, { Suspense } from "react";

const NewVerificationPage = () => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerificationPage;
