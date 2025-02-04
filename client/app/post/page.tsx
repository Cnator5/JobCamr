// import Header from '@/Components/Header';
// import React from 'react';
// import JobForm from './../../Components/JobPost/JobForm';

// function Page() { // Fix function definition
//   return (
//     <div>
//       <Header />
//       {/* Add content here */}
//       <h2 className='flex-1 pt-8 mx-auto text-4xl font-bold text-center'>
//         Create a post
//       </h2>

//       <div>
//         <JobForm />
//       </div>
//     </div>
//   );
// }

// export default Page;

"use client";
import Header from "@/Components/Header";
import JobForm from "@/Components/JobPost/JobForm";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const { isAuthenticated, loading } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // router.push("https://jobfindr-q1cl.onrender.com/login");
      router.push("http://localhost:8000/login");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex flex-col">
      <Header />

      <h2 className="flex-1 pt-8 mx-auto w-[90%] text-3xl font-bold text-black">
        Create a Job Post
      </h2>

      <div className="flex-1 pt-8 w-[90%] mx-auto flex justify-center items-center">
        <JobForm />
      </div>
    </div>
  );
}

export default page;
