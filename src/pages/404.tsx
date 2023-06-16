import React from "react";

const NotFound = () => {
  return (
    <>
      <h1 className="text-3xl text-center font-bold tracking-tighter text-amber-100 md:text-5xl">
        Something went wrong
      </h1>
      <p>You either clicked on a bad link or entered an invalid URL.</p>
    </>
  );
};

export default NotFound;
