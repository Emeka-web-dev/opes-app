"use client";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const Checkout = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const signOut = () => {
    logout();
  };
  const onClick = async () => {
    const { data } = await axios.get("/api/checkout");
    // response.data.
    if (data.status) {
      console.log(data.data.authorization_url);
      router.push(data.data.authorization_url);
    }
  };
  return (
    <div className="flex flex-col">
      {/* {JSON.stringify(user)} */}
      <p>{user?.email}</p>

      <button onClick={signOut} className="w-fit">
        signout
      </button>
      <Button onClick={onClick} className="w-fit">
        Payment
      </Button>
    </div>
  );
};

export default Checkout;
