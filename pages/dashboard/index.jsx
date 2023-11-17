"use client";

import { useSession,signOut  } from "next-auth/react";

function Dashboard() {
    const { data: session, status } = useSession();
    console.log(status);
    console.log(session);
  return( 
    <>
  <div>Dashboard2</div>
  <div>Status:  {status}</div>
  <div>email:  {session?.user?.email}</div>
  <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}

export default Dashboard;
