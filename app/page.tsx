"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      <h1>Homepage</h1>
    </>
  );
}
