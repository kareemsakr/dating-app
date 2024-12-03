import React from "react";
import Navbar from "../ui/Navbar";

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      {children}
      <footer></footer>
    </>
  );
}

export default AppLayout;
