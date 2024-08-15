import Feature from "@/app/_components/ui/Feature";
import Hero from "@/app/_components/ui/Hero";
import ProtectedRoute from "@/app/_helpers/middleware/ProtectedRoute";
import React from "react";

const page = () => {
  return (
    <>
        <Hero />
        <Feature />

    </>


  );
};

export default page;
