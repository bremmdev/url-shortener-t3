import React from "react";
import { api } from "@/utils/api";

type Props = {
  initialCount: number;
};

const ShortCount = ({ initialCount }: Props) => {
  const { data: count, isLoading } = api.url.getAll.useQuery(undefined, {
    initialData: initialCount,
  });

  console.log(isLoading);

  return (
    <div className="text-center text-slate-400 md:my-1 md:ml-10">
      Already shortened{" "}
      <span className="font extra-bold text-xl text-amber-100">{count}</span>{" "}
      urls<span className="text-amber-100">.</span>
    </div>
  );
};

export default ShortCount;
