"use client"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'


function page() {
  const router = useRouter();

  const handleClick = (index) => {
    const path = ["/home/tasks", "/home/challenge"]
    router.push(path[index]);
  };

  return (
    <div>
      <div className="p-5 bg-slate-100">
        SAMPLE HOME
      </div>
      <div className="container mt-5">
        <Button onClick={() => handleClick(0)}>Create New Task</Button>
      </div>

      <div className="container mt-5">
        <Button onClick={() => handleClick(1)}>Create New Challenge</Button>
      </div>
    </div>
  )
}

export default page
