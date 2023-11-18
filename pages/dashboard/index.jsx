"use client";

import { useSession, signOut } from "next-auth/react";
import StockDash from "../../components/StockDash";

function Dashboard() {
  const { data: session, status } = useSession();
  // console.log(status);
  // console.log(session);
  return (
    <>


      {/* <StockDash /> */}
    </>
  );
}

export default Dashboard;
