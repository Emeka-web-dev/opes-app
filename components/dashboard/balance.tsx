"use client";

import { useSocket } from "../providers/socket-provider";

type BalanceProps = {
  earning: number | undefined;
};
export const Balance = ({ earning }: BalanceProps) => {
  const { isConnected, socket } = useSocket();
  // console.log({ socket });
  return (
    <div>
      <div>Balance: {earning}</div>
      <div>{isConnected ? "Connected" : "Disconnected"}</div>
      {/* <div>{JSON.stringify(socket)}</div> */}
    </div>
  );
};
