import React from "react";
import { api } from "@/utils/api";

const ShortCount = () => {
  const { data: count } = api.url.getAll.useQuery();

  return (
    <div className="text-center md:my-1 md:ml-10 text-slate-400">
      Already shortened{" "}
      <span className="font extra-bold text-amber-100 text-xl">
        {count}
      </span>{" "}
      urls<span className="text-amber-100">.</span>
    </div>
  );
};

export default ShortCount;
