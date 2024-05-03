import { auth, signOut } from "@/auth";
import React from "react";
import { json } from "stream/consumers";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">signout</button>
      </form>
    </div>
  );
};

export default SettingsPage;
