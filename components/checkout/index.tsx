"use client";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const user = useCurrentUser();
  const signOut = async () => {
    await logout();
    window.location.reload();
  };
  const onClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/checkout");
      window.location.assign(data.data.authorization_url);
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* {JSON.stringify(user)} */}
      <p>{user?.email}</p>

      <Button onClick={signOut} className="w-fit">
        signout
      </Button>
      <Button onClick={onClick} className="w-fit" disabled={isLoading}>
        Payment
      </Button>
    </div>
  );
};

export default Checkout;
