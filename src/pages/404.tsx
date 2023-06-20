import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <>
      <h1 className="text-center text-3xl font-bold tracking-tighter text-amber-100 md:text-5xl">
        Something went wrong
      </h1>
      <p>You either clicked on a bad link or entered an invalid URL.</p>
      <Link
        href="/"
        className="focus-visible:ring-ring ring-offset-background my-4 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        Back Home
      </Link>
    </>
  );
};

export default NotFound;
