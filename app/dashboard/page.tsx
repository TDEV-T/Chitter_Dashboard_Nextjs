import React from "react";
import CardWraper from "../ui/dashboard/card";

const page = () => {
  return (
    <>
      <main>
        <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CardWraper />
        </div>
      </main>
    </>
  );
};

export default page;
